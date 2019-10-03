jest.mock('./install-config.json', () => {
    return {
        packages: [
            {
                name: 'testPackage0',
                script: 'install testPackage0'
            },
            {
                name: 'testPackage1',
                script: 'install testPackage1'
            },
            {
                name: 'testPackage2',
                script: 'install testPackage2'
            }
        ]
    }
});

const packageInstaller = require('./packageInstaller');
jest.mock('child_process');
const child_process = require('child_process');

beforeEach(() => {
    jest.resetAllMocks();

    child_process.spawn.mockReturnValue({
        stdout: {on: jest.fn()},
        stderr: {on: jest.fn()},
        on: jest.fn()
    });

});

function shellArgs(command) {
    return ["sh", ["-c", command]];
}

describe('install by name', function () {
    describe('when single name passed as argument', function () {
        it('should install matching package', function () {

            packageInstaller.action({
                names: "testPackage0"
            });


            expect(child_process.spawn).toHaveBeenCalledWith(...shellArgs("install testPackage0"));
        });
    });

    describe('when multiple names passed as arguments', function () {
       it('should install all matching packages', function () {

            packageInstaller.action({
                names: "testPackage0,testPackage2"
            });


           expect(child_process.spawn).toHaveBeenCalledWith(...shellArgs("install testPackage0"));
           expect(child_process.spawn).toHaveBeenCalledWith(...shellArgs("install testPackage2"));
       });

    });
});


