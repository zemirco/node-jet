var expect = require('chai').expect;
var errors = require('../lib/jet/errors');
var https = require('https');

describe('The jet.errors module', function () {
	[
		{
			errName: 'DaemonError'
			},
		{
			errName: 'InvalidUser',
			message: 'The specified user does not exist'
			},
		{
			errName: 'InvalidPassword',
			message: 'The specified password is wrong'
			},
		{
			errName: 'NotFound',
			message: 'No State/Method matching the specified path'
			},
		{
			errName: 'Occupied',
			message: 'A State/Method with the same path has already been added'
			},
		{
			errName: 'InvalidArgument',
			message: 'The provided argument(s) have been refused by the State/Method'
			},
		{
			errName: 'ConnectionClosed'
			},
		{
			errName: 'PeerTimeout',
			message: 'The peer processing the request did not respond within the specified timeout'
		},
		{
			errName: 'FetchOnly',
			message: 'The State cannot be modified'
		},
		{
			errName: 'Unauthorized',
			message: 'The request is not authorized for the user'
		}
	].forEach(function (errDesc) {

		var errName = errDesc.errName;
		describe('a jet.' + errName, function () {
			var ctor = errors[errDesc.errName];
			var err;
			var message;

			before(function () {
				if (errDesc.message) {
					err = new ctor();
					message = errDesc.message;
				} else {
					err = new ctor('bla');
					message = 'bla';
				}
			});

			it('is instance of Error', function () {
				expect(err).to.be.an.instanceof(Error);
			});

			it('Error is not parent class', function () {
				expect(new Error() instanceof ctor).to.be.false;
			});

			it('is instance of errors.BaseError', function () {
				expect(err).to.be.an.instanceof(errors.BaseError);
			});

			it('.name is jet.' + errName, function () {
				expect(err.name).to.be.equal('jet.' + errName);
			});

			it('.message is correct', function () {
				expect(err.message).to.be.equal(message);
			});

			it('.stack is a string', function () {
				expect(err.stack).to.be.a('string');
			});

			it('err.url points to github repo', function () {
				expect(err.url).to.match(/^https:\/\/github\.com\/lipp\/node-jet\//);
			});

		});
	});
});