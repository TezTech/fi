/*
slice(string, nat offset, nat length)	 => string
slice(bytes, nat offset, nat length)	 => bytes
*/
module.exports = function(core){
 return function(op){
	 var ret = {code : "", type : ''};
		if (op.length != 3) throw "Invalid arguments for function slice, expects 3";
		var v = core.compile.code(op.shift()), offset = core.compile.code(op.shift()), length = core.compile.code(op.shift());
		if (['bytes', 'string'].indexOf(v.type[0]) < 0) throw "Invalid type, expecting bytes or string not " + v.type[0];
		if (offset.type != 'nat') throw "Invalid type for offset, expecting nat not " + offset.type;
		if (length.type != 'nat') throw "Invalid type for length, expecting nat not " + length.type;
		
		ret.code += offset.code;
		ret.code += core.compile.ml('dip',length.code);
		ret.code += core.compile.ml('diip', v.code);
		ret.code += core.compile.ml('slice');
		ret.code += core.compile.error("Unable to slice");
		ret.type = v.type;
		return ret
	}
};