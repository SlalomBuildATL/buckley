jest.mock('./git-config.json', () => {
    return {
        "aliases": [
            {
                "action": "commit",
                "aliases": ['ci', 'cm']
            },
            {
                "action": "checkout",
                "aliases": ['co', 'ch']
            }
        ]
    }
});

const Git = require('nodegit');
const { configureAliases } = require('./configureGit');

const mockConfiguration = { setString: jest.fn() };


describe('configureAliases', () => {
    beforeEach(() => {
        jest.spyOn(Git.Config, 'findGlobal').mockReturnValue(Promise.resolve('/global/config'));
        jest.spyOn(Git.Config, 'openOndisk').mockReturnValue(Promise.resolve(mockConfiguration));
    });

    it('should configure aliases', (done) => {
        configureAliases()
            .then(() => {
                expect(mockConfiguration.setString).toHaveBeenCalledTimes(4);
                expect(mockConfiguration.setString).toHaveBeenCalledWith('alias.ci', 'commit');
                expect(mockConfiguration.setString).toHaveBeenCalledWith('alias.cm', 'commit');
                expect(mockConfiguration.setString).toHaveBeenCalledWith('alias.co', 'checkout');
                expect(mockConfiguration.setString).toHaveBeenCalledWith('alias.ch', 'checkout');
            }
        ).then(done);

    });

});