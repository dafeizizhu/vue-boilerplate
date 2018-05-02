/*
* @Author: xiejinlong
* @Date:   2017-09-05 10:22:35
* @Last Modified by:   xiejinlong
* @Last Modified time: 2017-09-06 16:52:23
*/
/**
 * 全局对象有Taf、HUYA、
 */

;(function() {
	// taf的基础库
	window.Taf ={}

Taf.INT8 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt8(tag, val); }
	this._read 	= function(is, tag, def) { return is.readInt8(tag, true, def); }
	this._className = function(){ return Taf.CHAR; }
};
Taf.INT16 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt16(tag, val); }
	this._read 	= function(is, tag, def) { return is.readInt16(tag, true, def); }
	this._className = function(){ return Taf.SHORT; }
};
Taf.INT32 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
	this._className = function(){ return Taf.INT32; }
};
Taf.INT64 = function()
{
	this._clone = function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt64(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt64(tag, true, def); }
	this._className = function(){ return Taf.INT64; }
};
Taf.UINT8 = function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt16(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt16(tag, true, def); }
	this._className = function(){ return Taf.SHORT; }
};
Taf.UInt16 = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
	this._className = function(){ return Taf.INT32; }
};
Taf.UInt32 = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeInt64(tag, val); }
	this._read  = function(is, tag, def) { return is.readInt64(tag, true, def); }
	this._className = function(){ return Taf.INT64; }
};
Taf.Float = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeFloat(tag, val); }
	this._read  = function(is, tag, def) { return is.readFloat(tag, true, def); }
	this._className = function(){ return Taf.FLOAT; }
};
Taf.Double = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeDouble(tag, val); }
	this._read  = function(is, tag, def) { return is.readDouble(tag, true, def); }
	this._className = function(){ return Taf.DOUBLE; }
};
Taf.STRING = function()
{
	this._clone = function() { return 0; }
	this._write = function(os, tag, val) { return os.writeString(tag, val); }
	this._read	= function(is, tag, def) { return is.readString(tag, true, def); }
	this._className = function(){ return Taf.STRING; }
};
Taf.BOOLEAN	= function()
{
	this._clone	= function() { return false; }
	this._write	= function(os, tag, val) { return os.writeBoolean(tag, val); }
	this._read	= function(is, tag, def) { return is.readBoolean(tag, true, def); }
	this._className = function(){ return Taf.BOOLEAN; }
};
Taf.ENUM	= function()
{
	this._clone	= function() { return 0; }
	this._write	= function(os, tag, val) { return os.writeInt32(tag, val); }
	this._read	= function(is, tag, def) { return is.readInt32(tag, true, def); }
};

/**
 * TAFVECTOR实现类
 */
Taf.Vector	= function(proto)
{
	this.proto = proto;
	this.value   = new Array();
}
Taf.Vector.prototype._clone = function() { return new Taf.Vector(this.proto); }
Taf.Vector.prototype._write	= function(os, tag, val) { return os.writeVector(tag, val); }
Taf.Vector.prototype._read  = function(is, tag, def) { return is.readVector(tag, true, def); }
Taf.Vector.prototype._className = function() {
	return Taf.TypeHelp.VECTOR.replace("$t",this.proto._className() );
}

/**
 * TAFMAP实现类
 */
Taf.Map	= function(kproto, vproto) 
{
	this.kproto = kproto;
	this.vproto = vproto;
	this.value 	= new Object();
};
Taf.Map.prototype._clone = function () { return new Taf.Map(this.kproto, this.vproto); }
Taf.Map.prototype._write = function (os, tag, val) { return os.writeMap(tag, val); }
Taf.Map.prototype._read	 = function (is, tag, def) { return is.readMap(tag, true, def); }

Taf.Map.prototype.put    = function(key, value) { this.value[key] = value; }
Taf.Map.prototype.get    = function(key) { return this.value[key]; }
Taf.Map.prototype.remove = function(key) { delete this.value[key]; }
Taf.Map.prototype.clear  = function()    { this.value = new Object(); }
Taf.Map.prototype.size   = function() 
{
	var anum = 0;
	for (var key in this.value) {anum++;}
	return anum;
};

Taf.Vector.prototype._className = function() {
	return Taf.TypeHelp.Map.replace("$k",this.kproto._className() ).replace("$v", this.vproto._className() );
}

//exports.Taf = Taf;

;
	// var Taf = Taf || {};
/*var tf = require('./libext.js'),
    Taf = tf.Taf;*/

/**
 * KevinTian@tencent.com
 *
 * JCE编解码底层辅助类
 */
Taf.DataHelp = {
    EN_INT8: 0,
    EN_INT16: 1,
    EN_INT32: 2,
    EN_INT64: 3,
    EN_FLOAT: 4,
    EN_DOUBLE: 5,
    EN_STRING1: 6,
    EN_STRING4: 7,
    EN_MAP: 8,
    EN_LIST: 9,
    EN_STRUCTBEGIN: 10,
    EN_STRUCTEND: 11,
    EN_ZERO: 12,
    EN_SIMPLELIST: 13
};

Taf.TypeHelp = {
    BOOLEAN: "bool",
    CHAR: "char",
    SHORT: "short",
    INT32: "int32",
    INT64: "int64",
    FLOAT: "float",
    DOUBLE: "double",
    STRING: "string",
    VECTOR: "list<$t>",
    MAP: "map<$k, $v>",
};

/**
 * 二进制Buffer类
 */
Taf.BinBuffer = function(buffer) {
    this.buf = null;
    this.vew = null;
    this.len = 0;
    this.position = 0;

    if (buffer != null && buffer != undefined && buffer instanceof Taf.BinBuffer) {
        this.buf = buffer.buf;
        this.vew = new DataView(this.buf);
        this.len = buffer.length;
        this.position = buffer.position;
    }
    if (buffer != null && buffer != undefined && buffer instanceof ArrayBuffer) {
        this.buf = buffer;
        this.vew = new DataView(this.buf);
        this.len = this.vew.byteLength;
        this.position = 0;
    }

    this.__defineGetter__("length", function() {
        return this.len;
    });
    this.__defineGetter__("buffer", function() {
        return this.buf;
    });
};

Taf.BinBuffer.prototype._write = function(os, tag, val) {
    return os.writeBytes(tag, val);
}


Taf.BinBuffer.prototype._read = function(os, tag, def) {
    return os.readBytes(tag, true, def);
}

Taf.BinBuffer.prototype._clone = function() {
    return new Taf.BinBuffer();
}

Taf.BinBuffer.prototype.allocate = function(uiLength) {
    uiLength = this.position + uiLength;
    if (this.buf != null && this.buf.length > uiLength) {
        return;
    }

    var temp = new ArrayBuffer(Math.max(256, uiLength * 2));
    if (this.buf != null) {
        new Uint8Array(temp).set(new Uint8Array(this.buf));
        this.buf = undefined;
    }

    this.buf = temp;
    this.vew = undefined;
    this.vew = new DataView(this.buf);
};

Taf.BinBuffer.prototype.getBuffer = function() {
    var temp = new ArrayBuffer(this.len);
    new Uint8Array(temp).set(new Uint8Array(this.buf, 0, this.len));
    return temp;
}

Taf.BinBuffer.prototype.memset = function(fbuf, offset, length) {
    this.allocate(length);
    new Uint8Array(this.buf).set(new Uint8Array(fbuf, offset, length), this.position);
};



Taf.BinBuffer.prototype.writeInt8 = function(value) {
    this.allocate(1);
    this.vew.setInt8(this.position, value);
    this.position += 1;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeUInt8 = function(value) {
    this.allocate(1);
    this.vew.setUint8(this.position++, value);
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeInt16 = function(value) {
    this.allocate(2);
    this.vew.setInt16(this.position, value);
    this.position += 2;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeUInt16 = function(value) {
    this.allocate(2);
    this.vew.setUint16(this.position, value);
    this.position += 2;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeInt32 = function(value) {
    this.allocate(4);
    this.vew.setInt32(this.position, value);
    this.position += 4;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeUInt32 = function(value) {
    this.allocate(4);
    this.vew.setUint32(this.position, value);
    this.position += 4;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeInt64 = function(value) {
    this.allocate(8);
    this.vew.setUint32(this.position, parseInt(value / 4294967296));
    this.vew.setUint32(this.position + 4, value % 4294967296);
    this.position += 8;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeFloat = function(value) {
    this.allocate(4);
    this.vew.setFloat32(this.position, value);
    this.position += 4;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeDouble = function(value) {
    this.allocate(8);
    this.vew.setFloat64(this.position, value);
    this.position += 8;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeString = function(value) {
    for (var arr = [], i = 0; i < value.length; i++) {
        arr.push(value.charCodeAt(i) & 0xFF);
    }

    this.allocate(arr.length);
    new Uint8Array(this.buf).set(new Uint8Array(arr), this.position);
    this.position += arr.length;
    this.len = this.position;
};

Taf.BinBuffer.prototype.writeBytes = function(value) {
    if (value.length == 0 || value.buf == null) return;

    this.allocate(value.length);
    new Uint8Array(this.buf).set(new Uint8Array(value.buf, 0, value.length), this.position);
    this.position += value.length;
    this.len = this.position;
};

Taf.BinBuffer.prototype.readInt8 = function() {
    return this.vew.getInt8(this.position++);
};

Taf.BinBuffer.prototype.readInt16 = function() {
    this.position += 2;
    return this.vew.getInt16(this.position - 2);
};

Taf.BinBuffer.prototype.readInt32 = function() {
    this.position += 4;
    return this.vew.getInt32(this.position - 4);
};

Taf.BinBuffer.prototype.readUInt8 = function() {
    this.position += 1;
    return this.vew.getUint8(this.position - 1);
};

Taf.BinBuffer.prototype.readUInt16 = function() {
    this.position += 2;
    return this.vew.getUint16(this.position - 2);
};

Taf.BinBuffer.prototype.readUInt32 = function() {
    this.position += 4;
    return this.vew.getUint32(this.position - 4);
};

Taf.BinBuffer.prototype.readInt64 = function() {
    var H4 = this.vew.getUint32(this.position);
    var L4 = this.vew.getUint32(this.position + 4);
    this.position += 8;
    return H4 * 4294967296 + L4;
};


Taf.BinBuffer.prototype.readFloat = function() {
    var temp = this.vew.getFloat32(this.position);
    this.position += 4;
    return temp;
}

Taf.BinBuffer.prototype.readDouble = function() {
    var temp = this.vew.getFloat64(this.position);
    this.position += 8;
    return temp;
}

Taf.BinBuffer.prototype.readString = function(value) {
    for (var arr = [], i = 0; i < value; i++) {
        arr.push(String.fromCharCode(this.vew.getUint8(this.position++)));
    }
    var result = arr.join("");
    try {
        result = decodeURIComponent(escape(result));
    } catch (e) {}
    return result;
};

Taf.BinBuffer.prototype.readBytes = function(value) {
    var temp = new Taf.BinBuffer();
    temp.allocate(value);
    temp.memset(this.buf, this.position, value);
    temp.position = 0;
    temp.len = value;
    this.position = this.position + value;
    return temp;
};

/**
 * TAFJCE输出编解码包裹类
 *
 * KevinTian@tencent.com
 */
Taf.JceOutputStream = function() {
    this.buf = new Taf.BinBuffer();
    this.getBinBuffer = function() {
        return this.buf;
    }
    this.getBuffer = function() {
        return this.buf.getBuffer();
    }
}

Taf.JceOutputStream.prototype.writeTo = function(tag, type) {
    if (tag < 15) {
        this.buf.writeUInt8((tag << 4 & 0xF0) | type);
    } else {
        this.buf.writeUInt16((0xF0 | type) << 8 | tag);
    }
};

Taf.JceOutputStream.prototype.writeBoolean = function(tag, value) {
    this.writeInt8(tag, value == true ? 1 : 0);
};

Taf.JceOutputStream.prototype.writeInt8 = function(tag, value) {
    if (value == 0) {
        this.writeTo(tag, Taf.DataHelp.EN_ZERO);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_INT8);
        this.buf.writeInt8(value);
    }
};

Taf.JceOutputStream.prototype.writeInt16 = function(tag, value) {
    if (value >= -128 && value <= 127) {
        this.writeInt8(tag, value);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_INT16);
        this.buf.writeInt16(value);
    }
}

Taf.JceOutputStream.prototype.writeInt32 = function(tag, value) {
    if (value >= -32768 && value <= 32767) {
        this.writeInt16(tag, value);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_INT32);
        this.buf.writeInt32(value);
    }
}

Taf.JceOutputStream.prototype.writeInt64 = function(tag, value) {
    if (value >= -2147483648 && value <= 2147483647) {
        this.writeInt32(tag, value);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_INT64);
        this.buf.writeInt64(value);
    }
}

Taf.JceOutputStream.prototype.writeUInt8 = function(tag, value) {
    this.writeInt16(tag, value);
}

Taf.JceOutputStream.prototype.writeUInt16 = function(tag, value) {
    this.writeInt32(tag, value);
}

Taf.JceOutputStream.prototype.writeUInt32 = function(tag, value) {
    this.writeInt64(tag, value);
}

Taf.JceOutputStream.prototype.writeFloat = function(tag, value) {
    if (value == 0) {
        this.writeTo(tag, Taf.DataHelp.EN_ZERO);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_FLOAT);
        this.buf.writeFloat(value);
    }
}

Taf.JceOutputStream.prototype.writeDouble = function(tag, value) {
    if (value == 0) {
        this.writeTo(tag, Taf.DataHelp.EN_ZERO);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_DOUBLE);
        this.buf.writeDouble(value);
    }
}

Taf.JceOutputStream.prototype.writeStruct = function(tag, value) {
    if (value.writeTo == undefined) {
        throw Error("not defined writeTo Function");
    }

    this.writeTo(tag, Taf.DataHelp.EN_STRUCTBEGIN);
    value.writeTo(this);
    this.writeTo(0, Taf.DataHelp.EN_STRUCTEND);
}

Taf.JceOutputStream.prototype.writeString = function(tag, value) {
    var str = value;
    try {
        str = unescape(encodeURIComponent(str));
    } catch (e) {}
    if (str.length > 255) {
        this.writeTo(tag, Taf.DataHelp.EN_STRING4);
        this.buf.writeUInt32(str.length);
    } else {
        this.writeTo(tag, Taf.DataHelp.EN_STRING1);
        this.buf.writeUInt8(str.length);
    }
    this.buf.writeString(str);
};

Taf.JceOutputStream.prototype.writeBytes = function(tag, value) {
    if (!(value instanceof Taf.BinBuffer)) {
        throw Error("value not instanceof Taf.BinBuffer");
    }

    this.writeTo(tag, Taf.DataHelp.EN_SIMPLELIST);
    this.writeTo(0, Taf.DataHelp.EN_INT8);
    this.writeInt32(0, value.length);
    this.buf.writeBytes(value);
};

Taf.JceOutputStream.prototype.writeVector = function(tag, value) {
    this.writeTo(tag, Taf.DataHelp.EN_LIST);
    this.writeInt32(0, value.value.length);
    for (var i = 0; i < value.value.length; i++) {
        value.proto._write(this, 0, value.value[i]);
    }
};

Taf.JceOutputStream.prototype.writeMap = function(tag, value) {
    this.writeTo(tag, Taf.DataHelp.EN_MAP);
    this.writeInt32(0, value.size());

    for (var temp in value.value) {
        value.kproto._write(this, 0, temp);
        value.vproto._write(this, 1, value.value[temp]);
    }
};

/**
 * TAFJCE输入编解码包裹类
 *
 * KevinTian@tencent.com
 */
Taf.JceInputStream = function(buffer) {
    this.buf = new Taf.BinBuffer(buffer);
};

Taf.JceInputStream.prototype.readFrom = function() {
    var temp = this.buf.readUInt8();
    var tag = (temp & 0xF0) >> 4;
    var type = (temp & 0x0F);

    if (tag >= 15) tag = this.buf.readUInt8();
    return { tag: tag, type: type };
};

Taf.JceInputStream.prototype.peekFrom = function() {
    var pos = this.buf.position;
    var head = this.readFrom();
    this.buf.position = pos;

    return { tag: head.tag, type: head.type, size: (head.tag >= 15) ? 2 : 1 };
};

Taf.JceInputStream.prototype.skipField = function(type) {
    switch (type) {
        case Taf.DataHelp.EN_INT8:
            this.buf.position += 1;
            break;
        case Taf.DataHelp.EN_INT16:
            this.buf.position += 2;
            break;
        case Taf.DataHelp.EN_INT32:
            this.buf.position += 4;
            break;
        case Taf.DataHelp.EN_STRING1:
            var a = this.buf.readUInt8();
            this.buf.position += a;
            break;
        case Taf.DataHelp.EN_STRING4:
            var b = this.buf.readInt32();
            this.buf.position += b;
            break;
        case Taf.DataHelp.EN_STRUCTBEGIN:
            this.skipToStructEnd();
            break;
        case Taf.DataHelp.EN_STRUCTEND:
        case Taf.DataHelp.EN_ZERO:
            break;
        case Taf.DataHelp.EN_MAP:
            {
                var size = this.readInt32(0, true);

                for (var i = 0; i < size * 2; ++i) {
                    var head = this.readFrom();
                    this.skipField(head.type);
                }

                break;
            }
        case Taf.DataHelp.EN_SIMPLELIST:
            {
                var head = this.readFrom();
                if (head.type != Taf.DataHelp.EN_INT8) {
                    throw Error("skipField with invalid type, type value: " + type + "," + head.type);
                }

                var a = this.readInt32(0, true);
                this.buf.position += a;
                break;
            }
        case Taf.DataHelp.EN_LIST:
            {
                var size = this.readInt32(0, true);
                for (var i = 0; i < size; ++i) {
                    var head = this.readFrom();
                    this.skipField(head.type);
                }
                break;
            }
        default:
            throw new Error("skipField with invalid type, type value: " + type);
    }
}

Taf.JceInputStream.prototype.skipToStructEnd = function() {
    for (;;) {
        var head = this.readFrom();
        this.skipField(head.type);

        if (head.type == Taf.DataHelp.EN_STRUCTEND) {
            return;
        }
    }
}

Taf.JceInputStream.prototype.skipToTag = function(tag, require) {
    while (this.buf.position < this.buf.length) {
        var head = this.peekFrom();
        if (tag <= head.tag || head.type == Taf.DataHelp.EN_STRUCTEND) {
            // if ((head.type == Taf.DataHelp.EN_STRUCTEND || tag != head.tag) && require) {
            //     break;
            // }
            // return true;
            return head.type == Taf.DataHelp.EN_STRUCTEND ? false : (tag == head.tag);
        }

        this.buf.position += head.size;
        this.skipField(head.type);
    }

    if (require) throw Error("require field not exist, tag:" + tag);
    return false;
}

Taf.JceInputStream.prototype.readBoolean = function(tag, require, def) {
    return this.readInt8(tag, require, def) == 1 ? true : false;
}

Taf.JceInputStream.prototype.readInt8 = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_INT8:
            return this.buf.readInt8();
    }
    throw Error("read int8 type mismatch, tag:" + tag + ", get type:" + head.type);
}

Taf.JceInputStream.prototype.readInt16 = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_INT8:
            return this.buf.readInt8();
        case Taf.DataHelp.EN_INT16:
            return this.buf.readInt16();
    }
    throw Error("read int8 type mismatch, tag:" + tag + ", get type:" + head.type);
}

Taf.JceInputStream.prototype.readInt32 = function(tag, requrire, def) {
    if (this.skipToTag(tag, requrire) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_INT8:
            return this.buf.readInt8();
        case Taf.DataHelp.EN_INT16:
            return this.buf.readInt16();
        case Taf.DataHelp.EN_INT32:
            return this.buf.readInt32();
    }
    throw Error("read int8 type mismatch, tag:" + tag + ", get type:" + head.type);
}

Taf.JceInputStream.prototype.readInt64 = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_INT8:
            return this.buf.readInt8();
        case Taf.DataHelp.EN_INT16:
            return this.buf.readInt16();
        case Taf.DataHelp.EN_INT32:
            return this.buf.readInt32();
        case Taf.DataHelp.EN_INT64:
            return this.buf.readInt64();
    }
    throw Error("read int64 type mismatch, tag:" + tag + ", get type:" + head.type);
}

Taf.JceInputStream.prototype.readFloat = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_FLOAT:
            return this.buf.readFloat();
    }
    throw Error("read float type mismatch, tag:" + tag + ", get type:" + h.type);
}

Taf.JceInputStream.prototype.readDouble = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    switch (head.type) {
        case Taf.DataHelp.EN_ZERO:
            return 0;
        case Taf.DataHelp.EN_DOUBLE:
            return this.buf.readDouble();
    }
    throw Error("read double type mismatch, tag:" + tag + ", get type:" + h.type);
}

Taf.JceInputStream.prototype.readUInt8 = function(tag, require, def) {
    return this.readInt16(tag, require, def);
}

Taf.JceInputStream.prototype.readUInt16 = function(tag, require, def) {
    return this.readInt32(tag, require, def);
}

Taf.JceInputStream.prototype.readUInt32 = function(tag, require, def) {
    return this.readInt64(tag, require, def);
}

Taf.JceInputStream.prototype.readStruct = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type != Taf.DataHelp.EN_STRUCTBEGIN) {
        throw Error("read struct type mismatch, tag: " + tag + ", get type:" + head.type);
    }

    def.readFrom(this);
    this.skipToStructEnd();
    return def;
}

Taf.JceInputStream.prototype.readString = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type == Taf.DataHelp.EN_STRING1) {
        return this.buf.readString(this.buf.readUInt8());
    }

    if (head.type == Taf.DataHelp.EN_STRING4) {
        return this.buf.readString(this.buf.readUInt32());
    }

    throw Error("read 'string' type mismatch, tag: " + tag + ", get type: " + head.type + ".");
}

Taf.JceInputStream.prototype.readString2 = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type == Taf.DataHelp.EN_STRING1) {
        return this.buf.readBytes(this.buf.readUInt8());
    }

    if (head.type == Taf.DataHelp.EN_STRING4) {
        return this.buf.readBytes(this.buf.readUInt32());
    }

    throw Error("read 'string' type mismatch, tag: " + tag + ", get type: " + head.type + ".");
}

Taf.JceInputStream.prototype.readBytes = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type == Taf.DataHelp.EN_SIMPLELIST) {
        var temp = this.readFrom();
        if (temp.type != Taf.DataHelp.EN_INT8) {
            throw Error("type mismatch, tag:" + tag + ",type:" + head.type + "," + temp.type);
        }
        var size = this.readInt32(0, true);
        if (size < 0) {
            throw Error("invalid size, tag:" + tag + ",type:" + head.type + "," + temp.type);
        }

        return this.buf.readBytes(size);
    }

    if (head.type == Taf.DataHelp.EN_LIST) {
        var size = this.readInt32(0, true);
        return this.buf.readBytes(size);
    }

    throw Error("type mismatch, tag:" + tag + ",type:" + head.type);
}

Taf.JceInputStream.prototype.readVector = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type != Taf.DataHelp.EN_LIST) {
        throw Error("read 'vector' type mismatch, tag: " + tag + ", get type: " + head.type);
    }

    var size = this.readInt32(0, true);
    if (size < 0) {
        throw Error("invalid size, tag: " + tag + ", type: " + head.type + ", size: " + size);
    }
    for (var i = 0; i < size; ++i) {
        def.value.push(def.proto._read(this, 0, def.proto._clone()));
    }

    return def;
}

Taf.JceInputStream.prototype.readMap = function(tag, require, def) {
    if (this.skipToTag(tag, require) == false) {
        return def;
    }

    var head = this.readFrom();
    if (head.type != Taf.DataHelp.EN_MAP) {
        throw Error("read 'map' type mismatch, tag: " + tag + ", get type: " + head.type);
    }

    var size = this.readInt32(0, true);
    if (size < 0) {
        throw Error("invalid map, tag: " + tag + ", size: " + size);
    }

    for (var i = 0; i < size; i++) {
        var key = def.kproto._read(this, 0, def.kproto._clone());
        var val = def.vproto._read(this, 1, def.vproto._clone());
        def.put(key, val);
    }

    return def;
}

;
	
// var Taf = Taf || {};
/*var tf = require('./libext.js'),
    Taf = tf.Taf;*/

/**
 * WUP使用类
 *
 */
Taf.Wup = function() {
    this.iVersion = 3;
    this.cPacketType = 0;
    this.iMessageType = 0;
    this.iRequestId = 0;
    this.sServantName = '';
    this.sFuncName = '';
    this.sBuffer = new Taf.BinBuffer();
    this.iTimeout = 0;
    this.context = new Taf.Map(new Taf.STRING(), new Taf.STRING());
    this.status = new Taf.Map(new Taf.STRING(), new Taf.STRING());
    this.data = new Taf.Map(new Taf.STRING(), new Taf.Map(new Taf.STRING(), new Taf.BinBuffer()));
    this.newdata = new Taf.Map(new Taf.STRING(), new Taf.BinBuffer());
};


Taf.Wup.prototype.setVersion = function(value) {
    this.iVersion = value;
}

Taf.Wup.prototype.getVersion = function(value) {
    return this.iVersion;
}


Taf.Wup.prototype.setServant = function(value) {
    this.sServantName = value;
};

Taf.Wup.prototype.setFunc = function(value) {
    this.sFuncName = value;
};


Taf.Wup.prototype.setRequestId = function(value) {
    this.iRequestId = value ? value : (++this.iRequestid);
};

Taf.Wup.prototype.getRequestId = function() {
    return this.iRequestId;
};


Taf.Wup.prototype.setTimeOut = function(value) {
    this.iTimeout = value;
};

Taf.Wup.prototype.getTimeOut = function() {
    return this.iTimeout;
};





Taf.Wup.prototype.writeTo = function() {
    // body...
    var os = new Taf.JceOutputStream();
    os.writeInt16(1, this.iVersion);
    os.writeInt8(2, this.cPacketType);
    os.writeInt32(3, this.iMessageType);
    os.writeInt32(4, this.iRequestId);
    os.writeString(5, this.sServantName);
    os.writeString(6, this.sFuncName);
    os.writeBytes(7, this.sBuffer);
    os.writeInt32(8, this.iTimeout);
    os.writeMap(9, this.context);
    os.writeMap(10, this.status);
    return new Taf.BinBuffer(os.getBuffer());
};


Taf.Wup.prototype.encode = function() {
    var os = new Taf.JceOutputStream();
    if (this.iVersion == 3) {
        os.writeMap(0, this.newdata);
    } else {
        os.writeMap(0, this.data);
    }
    this.sBuffer = os.getBinBuffer();

    var temp = new Taf.BinBuffer();
    temp = this.writeTo();

    var buf = new Taf.BinBuffer();
    buf.writeInt32(4 + temp.len);
    buf.writeBytes(temp);
    return buf;
}


Taf.Wup.prototype.writeBoolean = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeBoolean(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.BOOLEAN;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Taf.BinBuffer(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt8 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt8(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.CHAR;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Taf.BinBuffer(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt16 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt16(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.SHORT;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt32 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt32(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.INT32;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeInt64 = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeInt64(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.INT64;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeFloat = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeFloat(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.FLOAT;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeDouble = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeDouble(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = TAF.TypeHelp.DOUBLE;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeString = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeString(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = Taf.TypeHelp.STRING;
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeVector = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeVector(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBinBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = value._className();
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.writeStruct = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeStruct(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        //todo  
        var classType = " ";
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeBytes = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeBytes(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = "vec";
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}

Taf.Wup.prototype.writeMap = function(name, value) {
    var os = new Taf.JceOutputStream();
    os.writeMap(0, value);
    if (this.iVersion == 3) {
        this.newdata.put(name, new Taf.BinBuffer(os.getBuffer()));
    } else {
        var temp = this.data.get(name);
        var classType = Taf.Util.getClassType(value);
        if (temp == undefined) {
            var newNode = new Taf.Map(Taf.STRING, Taf.STRING);
            temp = newNode;
        }
        temp.put(classType, new Uint8Array(os.getBuffer()));
        this.data.put(name, temp);
    }
}


Taf.Wup.prototype.readFrom = function(is) {
    this.iVersion = is.readInt16(1, true);
    this.cPacketType = is.readInt8(2, true);
    this.iMessageType = is.readInt32(3, true);
    this.iRequestId = is.readInt32(4, true);
    this.sServantName = is.readString(5, true);
    this.sFuncName = is.readString(6, true);

    if (!!localStorage.__wup) {
        console.info('%c@@@ ' + this.sServantName + '.' + this.sFuncName, 'color:white;background:black;');
    }

    this.sBuffer = is.readBytes(7, true);
    this.iTimeout = is.readInt32(8, true);
    this.context = is.readMap(9, true);
    this.status = is.readMap(10, true);
}



Taf.Wup.prototype.decode = function(buf) {
    var is = new Taf.JceInputStream(buf);
    var len = is.buf.vew.getInt32(is.buf.position);
    if (len < 4) {
    	alert('页面出错，请重新进来');
        //throw Error("packet length too short");
    }
    // is.buf.length = len;
    is.buf.position += 4;
    this.readFrom(is);
    is = new Taf.JceInputStream(this.sBuffer.getBuffer());
    if (this.iVersion == 3) {
        this.newdata.clear();
        is.readMap(0, true, this.newdata);
    } else {
        this.data.clear();
        is.readMap(0, true, this.newdata);
    }
}


Taf.Wup.prototype.readBoolean = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readBoolean(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.BOOLEAN;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readBoolean(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt8 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt8(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.CHAR;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt8(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt16 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt16(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.SHORT;
        var newNode = temp.get(className);
        var is = new Taf.JceInputStream(newNode);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        def = is.readInt16(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readInt32 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt32(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.INT32;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt32(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readInt64 = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readInt64(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.INT64;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readInt64(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readFloat = function(name) {
    var temp, def;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readFloat(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.FLOAT;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readFloat(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readDouble = function(name) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readDouble(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var className = Taf.TypeHelp.DOUBLE;
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readDouble(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readVector = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readVector(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readVector(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readStruct = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readStruct(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readStruct(0, true, def);
    }
    return def;
}


Taf.Wup.prototype.readMap = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readMap(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readMap(0, true, def);
    }
    return def;
}

Taf.Wup.prototype.readBytes = function(name, def, className) {
    var temp;
    if (this.iVersion == 3) {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var is = new Taf.JceInputStream(temp.buffer);
        def = is.readBytes(0, true, def);
    } else {
        temp = this.newdata.get(name);
        if (temp == undefined) {
            throw Error("UniAttribute not found key:" + name);
        }
        var newNode = temp.get(className);
        if (newNode == undefined) {
            throw Error("UniAttribute not found type:" + className);
        }
        var is = new Taf.JceInputStream(newNode);
        def = is.readBytes(0, true, def);
    }
    return def;
}
;
	// var Taf = Taf || {};
/*var tf = require('./libext.js'),
    Taf = tf.Taf;*/

Taf.Util = Taf.Util || {};

Taf.Util.jcestream = function(value, col)
{
	if (value == null || value == undefined)
	{
		console.log("Taf.Util.jcestream::value is null or undefined");
		return ;
	}
	if (!(value instanceof ArrayBuffer))
	{
		console.log("Taf.Util.jcestream::value is not ArrayBuffer");
		return ;
	}
	col = col || 16;
	var view = new Uint8Array(value);
	var str = "";
	for (var i = 0; i < view.length; i++)
	{
		if (i != 0 && i%col == 0)
		{
			str += "\n";
		}
		else if (i!= 0)
		{
			str += " ";
		}

		str += (view[i] > 15?"":"0") + view[i].toString(16);
	}
	console.log(str.toUpperCase());
};

Taf.Util.str2ab = function (value)
{
    var idx, len = value.length, arr = new Array(len);
    for (idx = 0; idx < len; ++idx) 
    {
        arr[ idx ] = value.charCodeAt(idx);
    }

    return new Uint8Array(arr).buffer;
}; 

Taf.Util.ajax = function (sURL, oData, oSuccFunc, oFailFunc) 
{
	var xmlobj = new XMLHttpRequest();
	xmlobj.overrideMimeType('text/plain; charset=x-user-defined'); 	//必须的&&一定要设置

	var handleStateChange = function () 
	{
		if (xmlobj.readyState === 4) 
		{
			if (xmlobj.status === 200 || xmlobj.status === 304) 
			{
				oSuccFunc(Taf.Util.str2ab(xmlobj.response));
			} 
			else 
			{
				oFailFunc(xmlobj.status);
			}

			xmlobj.removeEventListener('readystatechange', handleStateChange);
			xmlobj = undefined;
		}
	};

    xmlobj.addEventListener('readystatechange', handleStateChange);
    xmlobj.open("post", sURL);
	xmlobj.send(oData);
};;

	// 基础协议
	// **********************************************************************
// This file was generated by a TAF parser!
// TAF version 2.1.6.5
// Generated from `GameLiveBase.jce'
// **********************************************************************
window.HUYA = {};
/*var tf = require('./libext.js'),
    Taf = tf.Taf;*/
    
/*require('./libjce.js');
require('./libwup.js');
require('./libutil.js');*/

HUYA.REDIS_CONNECT_FAIL = -100;
HUYA.REDIS_COMMAND_FAIL = -101;
HUYA.REDIS_RECORD_NOT_EXIST = -102;
HUYA.UTSMD5KEY = "UI-TASK-USER,{8001EC79-E45F-4db7-9B82-9508463C3DCF}";
HUYA.TemplateType = 
{
    PRIMARY : 1,
    RECEPTION : 2
};
HUYA.ELiveSource = 
{
    PC_YY : 0,
    PC_HUYA : 1,
    MOBILE_HUYA : 2,
    WEB_HUYA : 3
};

HUYA.EWebSocketCommandType = 
{
    EWSCmd_NULL : 0,
    EWSCmd_RegisterReq : 1,
    EWSCmd_RegisterRsp : 2,
    EWSCmd_WupReq : 3,
    EWSCmd_WupRsp : 4,
    EWSCmdC2S_HeartBeat : 5,
    EWSCmdS2C_HeartBeatAck : 6,
    EWSCmdS2C_MsgPushReq : 7,
    EWSCmdC2S_DeregisterReq : 8,
    EWSCmdS2C_DeRegisterRsp : 9,
    EWSCmdC2S_VerifyCookieReq : 10,
    EWSCmdS2C_VerifyCookieRsp : 11
};

HUYA.SecPackType = 
{
    kSecPackTypeActivityMsgNotice : 1010003
};

HUYA.UserId = function()
{
    this.lUid = 0;
    this.sGuid = "";
    this.sToken = "";
    this.sHuYaUA = "";
    this.sCookie = "";
};
HUYA.UserId.prototype._clone = function () { return new HUYA.UserId(); }
HUYA.UserId.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.UserId.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.UserId.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sGuid);
    os.writeString(2, this.sToken);
    os.writeString(3, this.sHuYaUA);
    os.writeString(4, this.sCookie);
};

HUYA.UserId.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sGuid= is.readString(1, false, this.sGuid);
    this.sToken= is.readString(2, false, this.sToken);
    this.sHuYaUA= is.readString(3, false, this.sHuYaUA);
    this.sCookie= is.readString(4, false, this.sCookie);
};



HUYA.UserInfo = function()
{
    this.lUid = 0;
    this.vHuyaB = new Taf.Vector(new Taf.INT32());
    this.iResignCard = 0;
    this.iExp = 0;
    this.iLevel = 0;
    this.iCurLevelExp = 0;
    this.iNextLevelExp = 0;
    this.iHuyaB = 0;
    this.iSignTaskStat = 0;
    this.iWatchLiveStat = 0;
    this.iLevelTaskStat = 0;
    this.vTaskStatus = new Taf.Vector(new HUYA.DailyTaskStatus());
};
HUYA.UserInfo.prototype._clone = function () { return new HUYA.UserInfo(); }
HUYA.UserInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.UserInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.UserInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeVector(1, this.vHuyaB);
    os.writeInt32(2, this.iResignCard);
    os.writeInt32(3, this.iExp);
    os.writeInt32(4, this.iLevel);
    os.writeInt32(5, this.iCurLevelExp);
    os.writeInt32(6, this.iNextLevelExp);
    os.writeInt32(7, this.iHuyaB);
    os.writeInt32(8, this.iSignTaskStat);
    os.writeInt32(9, this.iWatchLiveStat);
    os.writeInt32(10, this.iLevelTaskStat);
    os.writeVector(11, this.vTaskStatus);
};

HUYA.UserInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.vHuyaB= is.readVector(1, false, this.vHuyaB);
    this.iResignCard= is.readInt32(2, false, this.iResignCard);
    this.iExp= is.readInt32(3, false, this.iExp);
    this.iLevel= is.readInt32(4, false, this.iLevel);
    this.iCurLevelExp= is.readInt32(5, false, this.iCurLevelExp);
    this.iNextLevelExp= is.readInt32(6, false, this.iNextLevelExp);
    this.iHuyaB= is.readInt32(7, false, this.iHuyaB);
    this.iSignTaskStat= is.readInt32(8, false, this.iSignTaskStat);
    this.iWatchLiveStat= is.readInt32(9, false, this.iWatchLiveStat);
    this.iLevelTaskStat= is.readInt32(10, false, this.iLevelTaskStat);
    this.vTaskStatus= is.readVector(11, false, this.vTaskStatus);
};



// WebSocket用户信息,login时封装
HUYA.WSUserInfo = function()
{
    this.lUid = 0;
    this.bAnonymous = true;
    this.sGuid = "";
    this.sToken = "";
    this.lTid = 0;
    this.lSid = 0;
    this.lGroupId = 0;
    this.lGroupType = 0;
};
HUYA.WSUserInfo.prototype._clone = function () { return new HUYA.WSUserInfo(); }
HUYA.WSUserInfo.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSUserInfo.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSUserInfo.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeBoolean(1, this.bAnonymous);
    os.writeString(2, this.sGuid);
    os.writeString(3, this.sToken);
    os.writeInt64(4, this.lTid);
    os.writeInt64(5, this.lSid);
    os.writeInt64(6, this.lGroupId);
    os.writeInt64(7, this.lGroupType);
};

HUYA.WSUserInfo.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.bAnonymous= is.readBoolean(1, false, this.bAnonymous);
    this.sGuid= is.readString(2, false, this.sGuid);
    this.sToken= is.readString(3, false, this.sToken);
    this.lTid= is.readInt64(4, false, this.lTid);
    this.lSid= is.readInt64(5, false, this.lSid);
    this.lGroupId= is.readInt64(6, false, this.lGroupId);
    this.lGroupType= is.readInt64(7, false, this.lGroupType);
};

// 注册响应
HUYA.WSRegisterRsp = function()
{
    this.iResCode = 0;
    this.lRequestId = 0;
    this.sMessage = "";
};
HUYA.WSRegisterRsp.prototype._clone = function () { return new HUYA.WSRegisterRsp(); }
HUYA.WSRegisterRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSRegisterRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSRegisterRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iResCode);
    os.writeInt64(1, this.lRequestId);
    os.writeString(2, this.sMessage);
};

HUYA.WSRegisterRsp.prototype.readFrom = function (is)
{
    this.iResCode= is.readInt32(0, false, this.iResCode);
    this.lRequestId= is.readInt64(1, false, this.lRequestId);
    this.sMessage= is.readString(2, false, this.sMessage);
};

// WebScoket命令结构
HUYA.WebSocketCommand = function()
{
    this.iCmdType = 0;
    this.vData = new Taf.BinBuffer();
};
HUYA.WebSocketCommand.prototype._clone = function () { return new HUYA.WebSocketCommand(); }
HUYA.WebSocketCommand.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WebSocketCommand.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WebSocketCommand.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iCmdType);
    os.writeBytes(1, this.vData);
};

HUYA.WebSocketCommand.prototype.readFrom = function (is)
{
    this.iCmdType= is.readInt32(0, false, this.iCmdType);
    this.vData= is.readBytes(1, false, this.vData);
};


// websocket推送消息结构  根据uri对应具体推送结构
HUYA.WSPushMessage = function()
{
    this.ePushType = 0;
    this.iUri = 0;
    this.sMsg = new Taf.BinBuffer();
    this.iProtocolType = 0;
};
HUYA.WSPushMessage.prototype._clone = function () { return new HUYA.WSPushMessage(); }
HUYA.WSPushMessage.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSPushMessage.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSPushMessage.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.ePushType);
    os.writeInt64(1, this.iUri);
    os.writeBytes(2, this.sMsg);
    os.writeInt32(3, this.iProtocolType);
};

HUYA.WSPushMessage.prototype.readFrom = function (is)
{
    this.ePushType= is.readInt32(0, false, this.ePushType);
    this.iUri= is.readInt64(1, false, this.iUri);
    this.sMsg= is.readBytes(2, false, this.sMsg);
    this.iProtocolType= is.readInt32(3, false, this.iProtocolType);
};


// websocket心跳命令体
HUYA.WSHeartBeat = function()
{
    this.iState = 0;
};
HUYA.WSHeartBeat.prototype._clone = function () { return new HUYA.WSHeartBeat(); }
HUYA.WSHeartBeat.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSHeartBeat.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSHeartBeat.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iState);
};

HUYA.WSHeartBeat.prototype.readFrom = function (is)
{
    this.iState= is.readInt32(0, false, this.iState);
};


// 服务器生成的唯一id信息，请求时携带，标志唯一一台终端
// 当前服务器时间

HUYA.LiveAppUAEx = function()
{
    this.sIMEI = "";
    this.sAPN = "";
    this.sNetType = "";
};
HUYA.LiveAppUAEx.prototype._clone = function () { return new HUYA.LiveAppUAEx(); }
HUYA.LiveAppUAEx.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveAppUAEx.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveAppUAEx.prototype.writeTo = function (os)
{
    os.writeString(1, this.sIMEI);
    os.writeString(2, this.sAPN);
    os.writeString(3, this.sNetType);
};

HUYA.LiveAppUAEx.prototype.readFrom = function (is)
{
    this.sIMEI= is.readString(1, false, this.sIMEI);
    this.sAPN= is.readString(2, false, this.sAPN);
    this.sNetType= is.readString(3, false, this.sNetType);
};


HUYA.LiveUserbase = function()
{
    this.eSource = 0;
    this.eType = 0;
    this.tUAEx = new HUYA.LiveAppUAEx();
};
HUYA.LiveUserbase.prototype._clone = function () { return new HUYA.LiveUserbase(); }
HUYA.LiveUserbase.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveUserbase.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveUserbase.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.eSource);
    os.writeInt32(1, this.eType);
    os.writeStruct(2, this.tUAEx);
};

HUYA.LiveUserbase.prototype.readFrom = function (is)
{
    this.eSource= is.readInt32(0, false, this.eSource);
    this.eType= is.readInt32(1, false, this.eType);
    this.tUAEx= is.readStruct(2, false, this.tUAEx);
};


HUYA.LiveLaunchReq = function()
{
    this.tId = new HUYA.UserId();
    this.tLiveUB = new HUYA.LiveUserbase();
};
HUYA.LiveLaunchReq.prototype._clone = function () { return new HUYA.LiveLaunchReq(); }
HUYA.LiveLaunchReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveLaunchReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveLaunchReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tId);
    os.writeStruct(1, this.tLiveUB);
};

HUYA.LiveLaunchReq.prototype.readFrom = function (is)
{
    this.tId= is.readStruct(0, false, this.tId);
    this.tLiveUB= is.readStruct(1, false, this.tLiveUB);
};

HUYA.LiveProxyValue = function()
{
    this.eProxyType = 0;
    this.sProxy = new Taf.Vector(new Taf.STRING());
};
HUYA.LiveProxyValue.prototype._clone = function () { return new HUYA.LiveProxyValue(); }
HUYA.LiveProxyValue.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveProxyValue.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveProxyValue.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.eProxyType);
    os.writeVector(1, this.sProxy);
};

HUYA.LiveProxyValue.prototype.readFrom = function (is)
{
    this.eProxyType= is.readInt32(0, false, this.eProxyType);
    this.sProxy= is.readVector(1, false, this.sProxy);
};

HUYA.LiveLaunchRsp = function()
{
    this.sGuid = "";
    this.iTime = 0;
    this.vProxyList = new Taf.Vector(new HUYA.LiveProxyValue());
    this.eAccess = 0;
};
HUYA.LiveLaunchRsp.prototype._clone = function () { return new HUYA.LiveLaunchRsp(); }
HUYA.LiveLaunchRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.LiveLaunchRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.LiveLaunchRsp.prototype.writeTo = function (os)
{
    os.writeString(0, this.sGuid);
    os.writeInt32(1, this.iTime);
    os.writeVector(2, this.vProxyList);
    os.writeInt32(3, this.eAccess);
};

HUYA.LiveLaunchRsp.prototype.readFrom = function (is)
{
    this.sGuid= is.readString(0, false, this.sGuid);
    this.iTime= is.readInt32(1, false, this.iTime);
    this.vProxyList= is.readVector(2, false, this.vProxyList);
    this.eAccess= is.readInt32(3, false, this.eAccess);
};




// web端ip登录校验cookie请求
HUYA.WSVerifyCookieReq = function()
{
    this.lUid = 0;
    this.sUA = "";
    this.sCookie = "";
};
HUYA.WSVerifyCookieReq.prototype._clone = function () { return new HUYA.WSVerifyCookieReq(); }
HUYA.WSVerifyCookieReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSVerifyCookieReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSVerifyCookieReq.prototype.writeTo = function (os)
{
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sUA);
    os.writeString(2, this.sCookie);
};

HUYA.WSVerifyCookieReq.prototype.readFrom = function (is)
{
    this.lUid= is.readInt64(0, false, this.lUid);
    this.sUA= is.readString(1, false, this.sUA);
    this.sCookie= is.readString(2, false, this.sCookie);
};

// web端ip登录校验cookie应答
HUYA.WSVerifyCookieRsp = function()
{
    this.iValidate = 0;
};
HUYA.WSVerifyCookieRsp.prototype._clone = function () { return new HUYA.WSVerifyCookieRsp(); }
HUYA.WSVerifyCookieRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.WSVerifyCookieRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.WSVerifyCookieRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iValidate);
};

HUYA.WSVerifyCookieRsp.prototype.readFrom = function (is)
{
    this.iValidate= is.readInt32(0, false, this.iValidate);
};

// 供客户端onClientReady和服务器的EnterChannel使用
HUYA.EnterChannelReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.lTid = 0;
    this.lSid = 0;
    this.iChannelType = 0;
};
HUYA.EnterChannelReq.prototype._clone = function () { return new HUYA.EnterChannelReq(); }
HUYA.EnterChannelReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.EnterChannelReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.EnterChannelReq.prototype.writeTo = function (os)
{
    os.writeStruct(1, this.tUserId);
    os.writeInt64(2, this.lTid);
    os.writeInt64(3, this.lSid);
    os.writeInt32(4, this.iChannelType);
};

HUYA.EnterChannelReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(1, false, this.tUserId);
    this.lTid= is.readInt64(2, false, this.lTid);
    this.lSid= is.readInt64(3, false, this.lSid);
    this.iChannelType= is.readInt32(4, false, this.iChannelType);
};


//exports.HUYA = HUYA;
;

	//活动
	// 活动拉取回调
HUYA.ActivityMsgReq = function()
{
    this.tUserId = new HUYA.UserId();
    this.iActivityId = 0;
    this.lPid = 0;
    this.lTid = 0;
    this.lSid = 0;
    this.iChannelType = 0;
};
HUYA.ActivityMsgReq.prototype._clone = function () { return new HUYA.ActivityMsgReq(); }
HUYA.ActivityMsgReq.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.ActivityMsgReq.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.ActivityMsgReq.prototype.writeTo = function (os)
{
    os.writeStruct(0, this.tUserId);
    os.writeInt32(1, this.iActivityId);
    os.writeInt64(2, this.lPid);
    os.writeInt64(3, this.lTid);
    os.writeInt64(4, this.lSid);
    os.writeInt32(5, this.iChannelType);
};

HUYA.ActivityMsgReq.prototype.readFrom = function (is)
{
    this.tUserId= is.readStruct(0, false, this.tUserId);
    this.iActivityId= is.readInt32(1, false, this.iActivityId);
    this.lPid= is.readInt64(2, false, this.lPid);
    this.lTid= is.readInt64(3, false, this.lTid);
    this.lSid= is.readInt64(4, false, this.lSid);
    this.iChannelType= is.readInt32(5, false, this.iChannelType);
};


HUYA.ActivitySerializedMsg = function()
{
    this.iSubUri = 0;
    this.vContent = new Taf.BinBuffer();
};
HUYA.ActivitySerializedMsg.prototype._clone = function () { return new HUYA.ActivitySerializedMsg(); }
HUYA.ActivitySerializedMsg.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.ActivitySerializedMsg.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.ActivitySerializedMsg.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iSubUri);
    os.writeBytes(1, this.vContent);
};

HUYA.ActivitySerializedMsg.prototype.readFrom = function (is)
{
    this.iSubUri= is.readInt32(0, false, this.iSubUri);
    this.vContent= is.readBytes(1, false, this.vContent);
};

HUYA.ActivityMsgRsp = function()
{
    this.iEnable = 0;
    this.vSerializedMsg = new Taf.Vector(new HUYA.ActivitySerializedMsg());
};
HUYA.ActivityMsgRsp.prototype._clone = function () { return new HUYA.ActivityMsgRsp(); }
HUYA.ActivityMsgRsp.prototype._write = function (os, tag, value) { os.writeStruct(tag, value); }
HUYA.ActivityMsgRsp.prototype._read  = function (is, tag, def) { return is.readStruct(tag, true, def); }

HUYA.ActivityMsgRsp.prototype.writeTo = function (os)
{
    os.writeInt32(0, this.iEnable);
    os.writeVector(1, this.vSerializedMsg);
};

HUYA.ActivityMsgRsp.prototype.readFrom = function (is)
{
    this.iEnable= is.readInt32(0, false, this.iEnable);
    this.vSerializedMsg= is.readVector(1, false, this.vSerializedMsg);
};
;

	// 对应解包
	/**
 * TAF协议映射
 */
/*var HUYAObj = require('./Protocol.js'),
    HUYA = HUYAObj.HUYA;*/

var mx = mx || {};

mx.UriStruct = {
    "1010003": HUYA.ActivityMsgRsp
};
mx.WupStruct = {
    "doLaunch": HUYA.LiveLaunchRsp,
    "getActivityMsg": HUYA.ActivityMsgRsp
};




/*exports.mx = mx;*/

;

	

	function isIOS() {
    var browser = {
        versions: function() {
            var u = navigator.userAgent;
            return { //移动终端浏览器版本信息 
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端 
            };
        }()
    };

    return !!browser.versions.ios;
}

//随机打乱数组
function mess(arr) {
    var _floor = Math.floor,
        _random = Math.random,
        len = arr.length,
        i, j, arri,
        n = _floor(len / 2) + 1;
    while (n--) {
        i = _floor(_random() * len);
        j = _floor(_random() * len);
        if (i !== j) {
            arri = arr[i];
            arr[i] = arr[j];
            arr[j] = arri;
        }
    }
    return arr;
}

function getURLParam(name) {
    var value = location.search.match(new RegExp("[?&]" + name + "=([^&]*)(&?)", "i"));
    return value ? decodeURIComponent(value[1]) : value;
}

function logcss(color) {
    return "color:" + color + ";font-weight:900";
}
;

	var localIp = {};
var handleActUri = {};





function TafParser(obj) {
    var obj = obj || {};
    this.DEBUG_IP = '183.60.218.225:16258';
    this.DEF_IP = 'wsapi.huya.com';
    this.CDN_IP = 'cdnws.api.huya.com';
    this.ws = null; //链接ws对象
    this.connectTimes = 0; //连接上的次数
    this.connected = false; //是否链接上
    this.ipIndex = 0; //下发的ips中的索引
    this.isIos = isIOS();
    this.cdnLink = 'ws://' + this.CDN_IP;
    this.isDebug = obj.isDebug || false; // 是否用正式接口, false表示正式，
    this.userId = obj.userId;
    this.init();
}


function handleUri(msgUri) {
    var panelMessage = null;
    if(handleActUri[msgUri]){
        panelMessage= new handleActUri[msgUri]();
    }
    return panelMessage;
}

var iRequestId = 0;

TafParser.prototype = {
    constructor: TafParser,
    init: function() {
        var self = this;
        this.initEvent();

        this.connecting();

        //超时连cdn
        setTimeout(function() {
            self.connecting(self.cdnLink);
        }, 5000);
    },
    // 发送wup请求
    sendWup: function(moduleName, funcName, data ,iRequestId) {
        var wup = new Taf.Wup();
        wup.setServant(moduleName);
        wup.setFunc(funcName);
        if (iRequestId) wup.setRequestId(iRequestId);
        wup.writeStruct('tReq', data);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmd_WupReq;
        req.vData = wup.encode();

        var os = new Taf.JceOutputStream();
        req.writeTo(os);
        this.ws.send(os.getBuffer());
        console.log('%c>>>>>>> %creqWup: %c' + funcName, logcss('#009100'), logcss('black'), logcss('#009100'), data);
    },

    sendWup2: function(moduleName, funcName, data, callback, once) {
    	iRequestId++;
        if (typeof callback === "function") {
            var wupCallback = function(backData) {
                callback(backData);
                if (once || once == undefined) {
                    this.removeListener(funcName, wupCallback);
                }
            };
            this.addListener(funcName, wupCallback);
        }
        this.sendWup(moduleName, funcName, data, iRequestId);
    },
    // Register请求
    sendRegister: function(data) {
        var os = new Taf.JceOutputStream();
        data.writeTo(os);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmd_RegisterReq;
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);
        this.ws.send(os.getBuffer());
        console.log('%c>>>>>>> %creqRegister:', logcss('#009100'), logcss('#D26900'), data);
    },

    initEvent: function() {

        var _listeners = {};
        // 添加
        this.addListener = function(type, fn) {
            var eventArray = [];
            if(typeof type == 'string' && type.indexOf(' ') != -1) {
                eventArray = type.split(' ');
            }else {
                eventArray.push(type);
            }
            for(var i = 0; i < eventArray.length; i++ ) {
                var ev = eventArray[i];
                if (typeof _listeners[ev] === 'undefined') {
                    _listeners[ev] = [];
                }
                if (typeof fn === 'function') {
                    _listeners[ev].push(fn);
                }
            }
            return this;
        };
        // 触发
        this.dispatch = function(type, parmobj) {
            var arrayEvent = _listeners[type];
            if (arrayEvent instanceof Array) {
                for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                    if (typeof arrayEvent[i] === 'function') {
                        arrayEvent[i](parmobj);
                    }
                }
                if (arrayEvent.length === 0) {
                    console.info('收到未处理数据', type, parmobj);
                }
            } else {
                console.info('收到未处理数据', type, parmobj);
            }
            return this;
        };
        // 删除
        this.removeListener = function(type, fn) {
            var arrayEvent = _listeners[type];
            if (typeof type === 'string' && arrayEvent instanceof Array) {
                if (typeof fn === 'function') {
                    for (var i = 0, length = arrayEvent.length; i < length; i += 1) {
                        if (arrayEvent[i].fn === fn) {
                            _listeners[type].splice(i, 1);
                            break;
                        }
                    }
                } else {
                    delete _listeners[type];
                }
            }
            return this;
        };
    },
    _getConnectingLink: function(cdn_link) {
        var connectingLink = null;
        var protocol =  location.protocol;
        var wsProtocol = protocol == 'http:'? "ws://": "wss://"

        if(!cdn_link) {// 可以在超时的时候传入cdn链接
            //android使用ws协议和ip下发，ios只走wss协议
            if(!this.isIos && localIp && localIp.data) {
              localIp.data = mess(localIp.data);

              if(localIp.data.length > 2) {
                  localIp.data = localIp.data.slice(0,2);
              }
              
              if(this.ipIndex == localIp.data.length) {
                  // connectingLink = "ws://" + this.DEF_IP + ':8080';
                  connectingLink = wsProtocol + this.DEF_IP;
              } else {
                  connectingLink = wsProtocol + localIp.data[this.ipIndex++];
              }
            } else {
              // var baseProtocol = this.isIos ? "wss://" : "ws://";
              // connectingLink = baseProtocol + this.DEF_IP;

              if(this.isIos) {
                // connectingLink = "wss://" + this.DEF_IP + ':4433';
                connectingLink = "wss://" + this.DEF_IP;
              } else {
                // connectingLink = "ws://" + this.DEF_IP + ':8080';
                connectingLink = wsProtocol + this.DEF_IP;
              }
            }
        } else {
          connectingLink = cdn_link;
        }

        connectingLink += '/activity';

        if (this.isDebug) {
            connectingLink = wsProtocol + this.DEBUG_IP;
        }

        return connectingLink;
    },
    connecting: function(cdnLink) {
        if (this.connected) {
            return;
        };
        
        var connectingLink = this._getConnectingLink(cdnLink);

        console.log('当前使用的ip是---' + connectingLink);

        var self = this;
        var hearBeatTimeout = null; // close的时候应该停止心跳包的发送

        this.ws = new WebSocket(connectingLink);

        this.ws.onopen = function onopen() {
            console.log('=== WebSocket Connected ===');
            self.connected = true;

            self.VerifyCookie();

            clearInterval(hearBeatTimeout);
            hearBeatTimeout = setInterval(self.HeartBeat.bind(self), 60000); // 心跳包(这里注意要使用bind绑定作用域)
        };

        this.ws.onclose = function onclose(evt) {
            console.warn('=== WebSocket Closed ===', evt);
            self.connected = false;
            self.connectTimes++;

            //在发生onclose导致的关闭时重新初始化
            if (self.connectTimes <= 3) {
                self.ws = null;
                console.log('=== 隔一秒重连 ===');
                setTimeout(function() {
                    self.connecting();
                }, 1000);
            } else {
                clearInterval(hearBeatTimeout);
            }
        };

        this.ws.onerror = function onerror(evt) {
            console.warn('=== WebSocket Error ===', evt);
            self.connected = false;
            self.ws.close();
        };

        this.ws.onmessage = function onmessage(evt) {
            // Blob -> ArrayBuffer
            if (evt.data instanceof Blob) {
                var fileReader = new FileReader();
                fileReader.onload = function() {
                    self.handleOnMessage(this.result);
                };

                fileReader.onerror = function () {
                    // output(JSON.stringify(err));
                };

                fileReader.readAsArrayBuffer(evt.data);
            } else {
                self.handleOnMessage(evt.data);
            }
        };
    },
    handleOnMessage: function(arrayBuffer) {
        var is = new Taf.JceInputStream(arrayBuffer);
        var rsp = new HUYA.WebSocketCommand();
        rsp.readFrom(is);

        switch (rsp.iCmdType) {
            case HUYA.EWebSocketCommandType.EWSCmd_RegisterRsp: // 注册
                is = new Taf.JceInputStream(rsp.vData.buffer);
                var registerRsp = new HUYA.WSRegisterRsp();
                registerRsp.readFrom(is);
                console.log('%c<<<<<<< %crspRegister', logcss('#0000E3'), logcss('#D9006C'), registerRsp);
                this.dispatch('WSRegisterRsp', registerRsp);
                break;
            case HUYA.EWebSocketCommandType.EWSCmd_WupRsp: // wup协议
                var wup = new Taf.Wup();
                wup.decode(rsp.vData.buffer);

                var WupStruct = mx.WupStruct[wup.sFuncName];
                if (WupStruct) {
                    var wupStruct = new WupStruct();
                    var key = wup.newdata.get('tRsp') ? 'tRsp' : 'tResp';
                    wup.readStruct(key, wupStruct, mx.WupStruct[wup.sFuncName]);
                    console.log('%c<<<<<<< %crspWup:%c ' + wup.sFuncName, logcss('#0000E3'), logcss('black'), logcss('#0000E3'), wupStruct);

                    //拉取消息经过wup.readStruct解析一次后，还需要对里面的内容再解析一次得到最终的结果
                    if (wup.sFuncName === 'getActivityMsg') {
                        var enterMsgs = wupStruct.vSerializedMsg.value;

                        for (var i = 0, len = enterMsgs.length; i < len; i++) {
                            var temp = enterMsgs[i],
                                msgUri = temp.iSubUri;
                            var panelMessage = handleUri(msgUri);
                            if (!panelMessage)  continue;
                            is = new Taf.JceInputStream(temp.vContent.buffer);
                            panelMessage.readFrom(is);
                            this.dispatch(msgUri, panelMessage);
                        }
                    } else {
                        this.dispatch(wup.sFuncName, wupStruct);
                    }
                } else {
                    this.dispatch(wup.sFuncName);
                    console.info('收到未映射的WupRsp，sFuncName=' + wup.sFuncName);
                }
                break;
            case HUYA.EWebSocketCommandType.EWSCmdS2C_MsgPushReq: // 推送
                is = new Taf.JceInputStream(rsp.vData.buffer);
                var pushMess = new HUYA.WSPushMessage();
                pushMess.readFrom(is);
                // console.log(pushMess);

                is = new Taf.JceInputStream(pushMess.sMsg.buffer);
                var UriStruct = mx.UriStruct[pushMess.iUri];

                if (UriStruct) {
                    var uriStruct = new UriStruct();
                    uriStruct.readFrom(is);
                    console.log('%c<<<<<<< %crspMsgPush, %ciUri=' + pushMess.iUri, logcss('0#0000E3'), logcss('black'), logcss('#8600FF'), uriStruct);

                    //协议是否有效
                    // if(!uriStruct.iEnable) return;

                    if (pushMess.iUri === 1010003) {
                        var enterMsgs = uriStruct.vSerializedMsg.value;

                        for (var i = 0, len = enterMsgs.length; i < len; i++) {
                            var temp = enterMsgs[i],
                                msgUri = temp.iSubUri;
                            var panelMessage = handleUri(msgUri);
                            if (!panelMessage) continue;

                            is = new Taf.JceInputStream(temp.vContent.buffer);
                            panelMessage.readFrom(is);
                            this.dispatch(msgUri, panelMessage);
                        }
                    } else {
                        this.dispatch(pushMess.iUri, uriStruct);
                    }
                } else {
                    // console.info("收到未映射的WSPushMessage，uri=" + pushMess.iUri);
                }
                break;
            case HUYA.EWebSocketCommandType.EWSCmdS2C_HeartBeatAck: // 心跳返回
                console.log('%c<<<<<<< rspHeartBeat: ' + new Date().getTime(), logcss('#0000E3'));
                //保留
                break;
            case HUYA.EWebSocketCommandType.EWSCmdS2C_VerifyCookieRsp: //验证返回
                is = new Taf.JceInputStream(rsp.vData.buffer);
                var verifyRsp = new HUYA.WSVerifyCookieRsp();
                verifyRsp.readFrom(is);
                var isPass = verifyRsp.iValidate === 0;

                this.dispatch('WEBSOCKET_CONNECTED', verifyRsp);
                console.log('%c<<<<<<< %cVerifyCookie', logcss('#0000E3'), logcss('#D9006C'), '校验' + (isPass ? '通过！' : '失败！'), verifyRsp);
                break;
            default:
                console.warn('%c<<<<<<< Not matched CmdType: ' + rsp.iCmdType, logcss('#red'));
        }
    },
    //ip连接需要验证cookie
    VerifyCookie: function() {
        var yyuid = this.userId,
            isAnonymity = parseInt(yyuid) >= 2084428900;
        //if (!yyuid) return;
        var data = new HUYA.WSVerifyCookieReq();
        data.lUid = yyuid;
        data.sUA = '';
        data.sCookie = isAnonymity ? document.cookie : (document.cookie + ';yyuid=' + yyuid);

        var os = new Taf.JceOutputStream();
        data.writeTo(os);

        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmdC2S_VerifyCookieReq;
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);
        this.ws.send(os.getBuffer());

        console.log('%c>>>>>>> %cVerifyCookie:', data);
    },
    //心跳包
    HeartBeat: function() {
        // if (!taf.connected) return;

        // console.log("HeartBeat " + new Date().getTime());
        var req = new HUYA.WebSocketCommand();
        req.iCmdType = HUYA.EWebSocketCommandType.EWSCmdC2S_HeartBeat;
        var hearBeat = new HUYA.WSHeartBeat();
        hearBeat.iState = 0;

        var os = new Taf.JceOutputStream();
        hearBeat.writeTo(os);
        req.vData = os.getBinBuffer();

        os = new Taf.JceOutputStream();
        req.writeTo(os);

        this.ws && this.ws.send(os.getBuffer());
        console.log('%c>>>>>>> reqHeartBeat: ' + new Date().toLocaleString(), logcss('#009100'), hearBeat);
    }
}




	function HandleWithTaf(){
		this.initialize.apply(this, arguments);
	}

	HandleWithTaf.prototype = {
		initialize: function(obj) { 
	        var obj = obj || {};
	        this.isDebug = false;
	        for(var key in obj){
	        	this[key] = obj[key]
	        }
		},
		registerUriStruct: function(obj) {
			for(var key in obj){
				mx.UriStruct[key] = obj[key] 
			}	
		},
		registerWupStruct: function(obj) {
			for(var key in obj){
				mx.WupStruct[key] = obj[key] 
			}
		},
		registerHandleActUri: function(obj) {
			for(var key in obj){
				handleActUri[key] = obj[key] 
			}		
		},
		connect : function() {
			var _this = this;

			this.taf = new TafParser({
	        	isDebug : this.isDebug,
	        	userId: this.userId
	        });

	        //WebSocket 连接成功
	        this.taf.addListener('WEBSOCKET_CONNECTED', function(data) {
	            console.log('---WebSocket 连接成功---')
	            _this._doRegister(data.iValidate);
	            _this._doLaunch();
	        });

	        this.taf.addListener('WSRegisterRsp', function() {
	            console.log('---注册成功---');
	            _this._OnUserEvent();
	        });

	        // 监听doLaunch事件，获取动态ip
	        this.taf.addListener("doLaunch", function(data) {
	            //console.log('---doLaunch---')
	            //console.log(JSON.stringify(data))
	            var ipArr = data.vProxyList.value,
	                ipTarget = {};
	            for (var i = 0, len = ipArr.length; i < len; i++) {
	                var item = ipArr[i];
	                if (item.eProxyType == 6) {
	                    ipTarget.data = item.sProxy.value;
	                    ipTarget.preTime = new Date().getTime();

	                    try{
	                    	localStorage.setItem('road_of_star_ws_ip', JSON.stringify(ipTarget));
	                    }catch(e){}
	                    
	                    break;
	                }
	            }
	        });
		},
		_doRegister: function(validate) {
	        //console.log('verify---------->>>>>>>>>>' + validate)
	        var req = new HUYA.WSUserInfo();
	        req.lTid = this.channelId;
	        req.lSid = this.subChannelId;

	        this.validate = validate == 0;
	        req.lUid = this.userId || this.getCookie('yyuid');
	        req.bAnonymous = false;
	        this.taf.sendRegister(req);
	    },
	    _doLaunch: function() {
	        var req = new HUYA.LiveLaunchReq();
	        req.tLiveUB.eSource = HUYA.ELiveSource.WEB_HUYA;
	        this.taf.sendWup("liveui", "doLaunch", req);
	    },
	    //用户进入频道
	    _OnUserEvent: function() {
	        var req = new HUYA.EnterChannelReq();
	        var reqUserId = new HUYA.UserId();
	        reqUserId.lUid = this.userId || this.getCookie('yyuid');
	        req.tUserId = reqUserId;
	        req.lTid = this.channelId;
	        req.lSid = this.subChannelId;
	        //console.log("用户进入频道--参数")
	        //console.log(req)
	        this.taf.sendWup("ActivityUIServer", "OnClientReady", req);
	    },
	    getCookie: function(cookieName) {
		    var cookieString = document.cookie;
		    var cookies = cookieString.split(';');
		    for (var i = 0; i < cookies.length; i++) {
		        var cookie = cookies[i];
		        var start = cookie.indexOf(cookieName + '=');
		        if (start == -1 || start > 1) continue;
		        start += cookieName.length + 1;
		        return cookie.substring(start);
		    }
		    return null;
		}
	}

	window.HandleWithTaf = HandleWithTaf;

})();
