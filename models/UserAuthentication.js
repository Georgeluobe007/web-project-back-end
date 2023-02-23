module.exports = (sequelize,DataTypes) => {

    const UserAuthentication = sequelize.define("UserAuthentication",{
        Name:{
            type: DataTypes.STRING,
            allowNull: false
           },
       UserName:{
        type: DataTypes.STRING,
        allowNull: false
       },
       Email:{
        type: DataTypes.STRING,
        allowNull: false
       },
       Password:{
        type: DataTypes.STRING,
        allowNull: false
       },
       UserImage:{
        type: DataTypes.STRING,
        allowNull: false
       }
    })

  
    return UserAuthentication;
};