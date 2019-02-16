/*
to_contract(key)			 			=> contract unit;
to_contract(key_hash) 			=> contract unit;
to_contract(address) 				=> contract unit;
to_contract(address, type) 	=> contract type;
*/
module.exports = function(core){
 return function(op){
		var ret = {code : "", type : ['contract']};
		if (op.length < 1 || op.length > 2) throw "Invalid arguments for function, expects 1 or 2";
		var a1 = core.compile.code(op.shift()), type = ['unit'];
		ret.code += a1.code;
		if (['address', 'key_hash', 'key'].indexOf(a1.type[0]) < 0) throw "Invalid argument type for to_contract, expects address, key_hash or key not " + a1.type[0];
		if (a1.type[0] == 'address'){
			if (op.length) type = core.parse.type(op.shift()[0]);
			ret.code += "CONTRACT " + core.compile.type(type) + ";";
			ret.code += core.compile.error("Invalid contract param");
		} else if (a1.type[0] == 'key_hash' || a1.type[0] == "key") {
			if (a1.type[0] == "key") {
				ret.code += core.compile.ml('hash_key');
			};
			ret.code += core.compile.ml('implicit_account');
		}

		ret.type.push(type);
		return ret
	}
};