const nodegit = jest.genMockFromModule('nodegit');
function Clone(url, path) {
    return Promise.resolve({})
}

nodegit.Clone = Clone;
module.exports = nodegit;