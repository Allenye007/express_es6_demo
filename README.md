### 采坑：

###### 1>

node不支持部分es6语法 ： import 下载下面的就可以支持
npm install --save-dev babel-preset-env babel-cli

###### 2>

在insert vendor 时犯得错误：
​	1.没有看清ID是字符串；

​	2.在走catch情况下，没有手动删除表。

插件：  shortid

#### 关联表：（hasone/hasmany/belongsto）

```
1.在一个User.hasOne(Project)形式的调用中，正在调用的模型User是源模型而做为参数被传入的Project模型是目标模型。

BelongsTo - 属于
2.BelongsTo关联表示一对一关系的外键存在于 《源模型》。
    Player.belongsTo(Team); // 会为Player添加一个teamId 属性以保持与Team 主键的关系
    默认情况下，一个属于关系的外键将从目标模型的名称和主键名称生成。
3.在定义中使用as命名时，会将其做为目标模型的名称：
    User.belongsTo(UserRole, {as: 'role'}); // 会为 user添加 roleId 属性而不是 userRoleId
4.在任命情况下，使用了foreignKey选项，外键名都会使用此选项值。我可以在Sequelize 中像下面这样使用外键：
    User.belongsTo(Company, {foreignKey: 'fk_company'}); // 为User 添加fk_company 外键
5.目标键是位于目标模型上通过源模型外键列指向的列。默认情况下，目标键是会belongsTo关系中目标模型的主键。要使用自定义列，请用targetKey选项来指定：
    User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // 为User 添加 fk_companyname 目标键

HasOne - 拥有一个
6.HasOne关联表示一对一关系的外键存在于目标模型。
    你同样可以自定义外键，如：你想使用一个已存在数据库:
    Project.hasOne(User, { foreignKey: 'initiator_id' })  外键会存在于users 表中，此项是自定义外键
    Person.hasOne(Person, {as: 'Father', foreignKey: 'DadId'})  会为Person 增加一个 DadId 属性
7.如果想对一个表做两次连接查询:
    Team.hasOne(Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
    Team.hasOne(Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});
8.一对多(One-To-Many)关联
    Project.hasMany(User, {as: 'Workers'})
```

### 事务：

```
{transaction: t} 两种写法儿
```

