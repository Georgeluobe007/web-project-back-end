module.exports = (sequelize,DataTypes) => {
  const post = sequelize.define("post",{
    title:{
       type: DataTypes.STRING,
       allowNull: false ,
    },
    post:{
        type: DataTypes.STRING,
        allowNull: false ,
     },
     username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
  })
  return post;
}
