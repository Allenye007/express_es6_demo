let transaction;    

try {
  // get transaction
  transaction = await sequelize.transaction();

  // step 1
  await Model.destroy({where: {id}, transaction});

  // step 2
  await Model.create({}, {transaction});

  // commit
  await transaction.commit();

} catch (err) {
  // Rollback transaction if any errors were encountered
  await transaction.rollback();
}