const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    month:{
        type:Number,
        required:true
    },

    year:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Income",incomeSchema);