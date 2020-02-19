const seq=require('sequelize');
var sequelize= new seq('hrms','bhagyalakshmi','ChangeMe',{
    host : 'localhost',
    dialect:'postgres',
    pool:{
        max:5,
        min:0,
        idle:10000
    },
});