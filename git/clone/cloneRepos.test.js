jest.mock('./git-config.json', () => {
    return {
        "projects": [
            {
                "name": "testProject",
                "repos": [
                    {
                        "name": "Buckley",
                        "url": "https://github.com/SlalomBuildATL/buckley.git"
                    }
                ]
            }
        ]
    }
});

jest.mock('os');
const os = require('os');

const Git = require('nodegit');
const {cloneRepos} = require('./cloneRepos');

describe('cloneRepos', function () {
    beforeEach(function () {
        os.homedir.mockReturnValue('/usr/home/testUser');
        jest.spyOn(Git, 'Clone');
    });

    describe('when project name specified', () => {

        describe('and a directory is specified', () => {

            it('should clone repos into specified directory', function () {
                cloneRepos({project: "testProject", dir: "/tmp"});

                expect(Git.Clone).toHaveBeenCalledWith(
                    "https://github.com/SlalomBuildATL/buckley.git",
                    "/tmp/Buckley");
            });
        });

        describe('and no directory specified', () => {
            it('should clone repos into default project directory', () => {
                cloneRepos({project: "testProject"});

                expect(Git.Clone).toHaveBeenCalledWith(
                    "https://github.com/SlalomBuildATL/buckley.git",
                    "/usr/home/testUser/dev/projects/testProject/Buckley");
            });
        });
    });
});