export default function FabaBindable(target:any, key:string) {
    // property value
    var _val = target[key];

    // property getter
    var getter = function () {
        return _val;
    };

    // property setter
    var setter = function (newVal) {
        //console.log(`Set: ${key} => ${newVal}`);
        _val = newVal;
        this.invokeBindChange()
    };

    // Delete property.
    if (delete target[key]) {
        // Create new property with getter and setter
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}