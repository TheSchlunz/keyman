import { constants } from './keyboardprocessor_ldml';

const keys = Object.keys(constants);
keys.sort();
console.log(`//
// Generated File - do not edit
//
// This file is generated by core/tools/ldml-const-builder/build.sh
// based on core/include/ldml/keyboardprocessor_ldml.ts
//

#pragma once`);

for (const key of keys) {
    const value = constants[key];
    const upkey = key.toUpperCase();
    const type = typeof value;
    if ((key.indexOf('section_') === 0) && type === 'string' && value.length === 4) {
        // the 4-char section ID strings get handled specially
        console.log('// Section ID');
        console.log(`#define LDML_${upkey} ((uint32_t)'${value}')`);
    } else if (type === 'number') {
        console.log(`#define LDML_${upkey} ${value}`);
    } else if (type === 'string') {
        console.log(`#define LDML_${upkey} "${value}"`);
    }
}