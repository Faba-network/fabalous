export default class FabaModel{

    bin:Array<any>;

    constructor(){
        this.bin = new Array<any>();
    }

    addChangeListener(cb) {
        this.bin.push(cb);
    }

    removeChangeListener(cb) {
    }

    invokeBindChange(){
        if (!this.bin) return;
        this.bin.forEach(binding =>{
            binding();
        })
    }
}



