const {toHttps} = require("./gitUrlParser");
const { toSsh } = require('./gitUrlParser')

describe('toSsh', function () {
    describe('when given url is SSH', function () {
        it('should return url', function () {
            expect(toSsh("git@github.com:SlalomBuildATL/buckley.git")).toEqual("git@github.com:SlalomBuildATL/buckley.git")
        });
    });

    describe('when given url is https without .git suffix', function () {
        it('should return formatted ssh url', function () {
            expect(toSsh("https://github.com/SlalomBuildATL/buckley")).toEqual("git@github.com:SlalomBuildATL/buckley.git")
        });
    });

    describe('when given url is https with .git suffix', function () {
        it('should return formatted ssh url', function () {
            expect(toSsh("https://github.com/SlalomBuildATL/buckley.git")).toEqual("git@github.com:SlalomBuildATL/buckley.git")
        });
    });
});

describe('toHttps', function () {
    describe('when given url is HTTPS with .git suffix', function () {
        it('should return url', function () {
            expect(toHttps("https://github.com/SlalomBuildATL/buckley.git")).toEqual("https://github.com/SlalomBuildATL/buckley.git")
        });
    });

    describe('when given url is https without .git suffix', function () {
        it('should return url with .git suffix', function () {
            expect(toHttps("https://github.com/SlalomBuildATL/buckley")).toEqual("https://github.com/SlalomBuildATL/buckley.git")
        });
    });

    describe('when given url is ssh url', function () {
        it('should return formatted https url', function () {
            expect(toHttps("git@github.com:SlalomBuildATL/buckley.git")).toEqual("https://github.com/SlalomBuildATL/buckley.git")
        });
    });


});
