function isSshUrl(url) {
    return url.startsWith("git@") && url.endsWith(".git")
}

function toSsh(url) {
    if (isSshUrl(url)) {
        return url
    } else {
        const repoWithoutProtocol = url.split("://")[1];
        const [domain, user, repo] = repoWithoutProtocol.split('/');
        return `git@${domain}:${user}/${repo}${repo.endsWith('.git') ? '' : '.git'}`
    }
}

function toHttps(url) {
    if (isSshUrl(url)) {
        const [user, rest] = url.split('@');
        const [domain,repo] = rest.split(':');
        return `https://${domain}/${repo}`;

    } else {
        return `${url}${url.endsWith('.git') ? '' : '.git'}`
    }
}

module.exports = {toSsh, toHttps}
