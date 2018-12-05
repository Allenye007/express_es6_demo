class A {
    constructor(x,y,color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    hi() {
        return console.log(this.color)
    }
}



class B extends A {
    constructor() {
        super();
        console.log(this);
    }

}

B.hi()


/*
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
    constructor() {
        super();
    }
}

B.hello()  // hello world
*/