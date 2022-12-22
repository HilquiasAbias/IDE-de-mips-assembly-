import * as tools from '../../toolkit.js'
import * as formatting from './formatting.js'
import instructions from "./instructions.js"
import operationInstruction from "./operation.js"

function selectOrganizationType(type, arr) {
    if (type === 'a') return formatting.organizationFromTypeA(arr)
    if (type === 'b') return formatting.organizationFromTypeB(arr)
    if (type === 'c') return formatting.organizationFromTypeC(arr)
    if (type === 'd') return formatting.organizationFromTypeC(arr)
    if (type === 'e') return formatting.organizationFromTypeC(arr)
    if (type === 'f') return formatting.organizationFromTypeC(arr)
    if (type === 'g') return formatting.organizationFromTypeC(arr)
    if (type === 'h') return formatting.organizationFromTypeC(arr)
}

export function isTypeR(fn) {
    return instructions[fn] !== undefined
}

export function whichOrganization(op) {
    return instructions[op].type
}

export function formatInstruction(instruction, memorySpace) {
    if (instruction.func === 'syscall') 
        return {
            address: tools.formatAddress(memorySpace),
            code: '0x0000000c',
            typing: {
                type: 'r',
                org: 'b' // instructions[instruction.func].type
            },
            syscall: true
        }

    const binary = selectOrganizationType(
        instructions[ instruction.func ].type,
        formatting.formatArrayElements( [ instruction.func, ...instruction.values ] )
    )

    return {
        address: tools.formatAddress(memorySpace),
        code: tools.convertBinInstructionToHex(binary),
        does: instructions[ instruction.func ].does,
        GPR: operationInstruction(instruction),
        typing: {
            type: 'r',
            org: instructions[ instruction.func ].type
        },
        label: instruction.label
    }
}
