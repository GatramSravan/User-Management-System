// app.get('/',(req,res)=>{
//     //res.send('Hellloooo World');
//     const locals = {
//         title : 'NodeJs',
//         description : 'Heelloo'

//     }
//     res.render('index.ejs',locals);
// });





const Customer = require('../models/Customer');
const mongoose = require('mongoose');

//Home page
exports.homepage = async(req,res)=>{

    const locals = {
                title : 'NodeJs',
                description : 'Heelloo'
        
            }

    try {
        const customers = await Customer.find({}).limit(22);
        res.render('index.ejs',{locals,customers});
    } catch (error) {
        console.log(error);
    }

}

//Add Customer Page

exports.addCustomer = async(req,res)=>{

    const locals = {
                title : 'Add New Customer',
                description : 'Heelloo'
        
            }
            res.render('customers/add.ejs',locals);

}



exports.postCustomer = async(req,res)=>{

    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email

    });

    try {
        await Customer.create(newCustomer);
        res.redirect('/');
        
    } catch (error) {
        console.log(error);
    }

}


exports.view = async(req,res)=>{
    try {
        const customer = await Customer.findOne({_id : req.params.id })
        const locals = {
            title : 'Add New Customer',
            description : 'Heelloo'
    
        }
        res.render('customers/view.ejs',{customer,locals})
        
    } catch (error) {
        console.log(error);
        
    }

}





exports.edit = async(req,res)=>{
    try {
        const customer = await Customer.findOne({_id : req.params.id })
        const locals = {
            title : 'Add New Customer',
            description : 'Heelloo'
    
        }
        res.render('customers/edit.ejs',{customer,locals})
        
    } catch (error) {
        console.log(error);
        
    }

}




exports.editPost = async(req,res)=>{
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            tel : req.body.tel,
            email : req.body.email

        });
        await res.redirect(`/edit/${req.params.id}`);
        
    } catch (error) {
        console.log(error);
        
    }
}





exports.deleteCustomer = async(req,res)=>{
    try {
        await Customer.deleteOne({_id: req.params.id});
        res.redirect('/');
        
    } catch (error) {
        console.log(error);
        
    }
}

exports.searchCustomer = async(req,res)=>{
    const locals = {
        title: "Search Customer Data",
        description: "Free NodeJs User Management System",
      };
    try {

        let searchTerm = req.body.searchTerm;//In header .ejs search id is searchTerm
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or:[

                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
                { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
            ]

            
        });

        res.render("search", {
            customers,
            locals
          })
        
    } catch (error) {
        console.log(error);
        
    }
}