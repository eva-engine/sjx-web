import { EventEmitter } from "eventemitter3";

/**
 * 基于localStorage实现的实时缓存系统, 5MB之内的缓存存储时间基本小于一帧时间，不会造成UI线程卡死
 */
export class ImmediateStorager<T extends { [key: string]: any }> extends EventEmitter {
    constructor(public name: string, defaultObjs: T) {
        super();
        const self = this;
        let obj: T;
        try {
            obj = Object.assign(defaultObjs, JSON.parse(localStorage.getItem(name)!) ?? defaultObjs);
        } catch {
            obj = defaultObjs;
        }
        let handler = <ProxyHandler<any> & { name: string }>{
            name: '',
            get(target, p: string, receiver) {
                try {
                    return new Proxy(target[p], { ...handler, name: handler.name + '/' + p } as any);
                } catch (e) {
                    return Reflect.get(target, p, receiver);
                }
            },
            defineProperty(target, p: string, descriptor) {
                var res = Reflect.defineProperty(target, p, descriptor);
                self.save();
                self.onChange?.(p, descriptor);
                self.emit(`change${this.name + '/' + p}`, descriptor.value);
                return res;
            },
            deleteProperty(target, property: string) {
                var res = Reflect.deleteProperty(target, property);
                self.save();
                self.onDelete?.(property);
                self.emit(`change${this.name + '/' + property}`, undefined);
                return res;
            }
        };
        this.value = new Proxy(obj, handler);
        this.baseValue = obj;
    }
    onChange?: (p: string | symbol, descriptor: PropertyDescriptor) => void
    onDelete?: (p: string | symbol) => void
    baseValue: T
    value: T
    getValue() {
        return this.value;
    }
    getBaseValue() {
        return this.baseValue;
    }
    saved = false
    save() {
        try {
            localStorage[this.name] = JSON.stringify(this.baseValue);
        } catch (e: any) {
            console.error(e, e.message);
            console.error(`缓存保存失败`);
        }
    }
}
