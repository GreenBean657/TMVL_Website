/*
 * This module provides a function to resolve allowed IP addresses for registration.
 */


const dns = require('dns');
const { promisify } = require('util');
const dnsLookup = promisify(dns.lookup);

async function resolveAllowedIps() {
    const host = process.env.ALLOWED_REGISTER_HOST;
    if (!host) return ["127.0.0.1", "localhost"];
    try {
        const { address } = await dnsLookup(host);
        console.log(`Allowed register IP resolved: ${address}`);
        return [address];
    } catch (err) {
        console.error(`Failed to resolve ${host}:`, err.message);
        return process.env.ALLOWED_REGISTER_IPS?.split(',') || [];
    }
}

module.exports = {
    resolveAllowedIps
};