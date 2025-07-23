const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');


exports.registerUser = async(req, res)  => {
    try{
        const { firstName, lastName, email_id, password, created_by} = req.body;

        const userExists = await User.findOne({email_id});

        if(userExists){
            return res.status(400).json({message: 'Email already registered'});   
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email_id,
            password: hashedPassword,
            audit: { created_by },
            status: 1
        });

        await newUser.save();

        res.status(201).json({ message: 'Registered Successfully'});
    }catch(err){
        console.error('Registration error:', err.message);
        res.status(500).json({error: 'User registration failed'});
    }
};

exports.loginUser = async(req, res) => {
    try{
        const { email_id, password} = req.body;

        const user = await User.findOne({email_id});

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid email or passsword'});
        }

        const token = jwt.sign(
            {id: user._id, email_id: user.email_id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );

        

        res.status(200).json({
             message: 'Login sucessful', token, user:{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email_id: user.email_id
             }});
    } catch(err){
        console.error('Login error', err.message);
        res.status(500).json({error: 'Login failed' });
    }
};

exports.cart = async(req, res) =>{
    try{
        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({ message: "User not logged in"});
        }

        const {items} = req.body;
        
        if(!items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({ message: "No items provided"});
        }

        
        const incomingItem = items[0];
        const {productId, name, price, quantity} = incomingItem;


        if(!productId || !name || !price){
            return res.status(400).json({ message: "Missing product info"});
        }

    
        let cart = await Cart.findOne({userId});

        if(!cart){
            cart =new Cart({
                userId,
                items: [{productId, name, price, quantity}],
            });
        }else{
            const existingItem = cart.items.find(item => item.productId === productId);
            if(existingItem){
                existingItem.quantity += quantity || 1;
            }else{
                cart.items.push({ productId, name, price, quantity});
            }
        }
        console.log("Saving cart with items:", cart.items);

        try{
            await cart.save();

        res.status(200).json({ message: "Cart saved", cart});
        }catch(err){
              console.error("Save error:", err.message);
  res.status(500).json({ message: "Cart saving failed", error: err.message });
        }
    }catch(error){
        console.error("Cart error:", error.message);
        res.status(500).json({ message: "Cart processinhg failed"});
    }
}