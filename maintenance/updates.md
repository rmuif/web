# Updates

RMUIF is constantly evolving with new improvements and bug fixes merged in everyday. It doesn’t follow a strict versioning system like Node packages do with semantic versioning, it’s more of a loosely defined romantic versioning system.

## Update RMUIF

Updating the template is usually very easy if it’s just a new feature or improvement, but if a commit has changed something you have changed you will have to resolve the merge conflict.

The template is updated using git, you essentially just add the RMUIF repository as an upstream origin and fetch new changes from there:

```bash
git remote add upstream https://github.com/phoqe/rmuif.git
git fetch upstream
git pull
```

{% hint style="info" %}
Every time you feel the need to update you just run `git fetch upstream && git pull` and you’ll be on the latest version, just make sure to resolve the merge conflicts and push it to your own repository.
{% endhint %}



