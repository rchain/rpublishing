#### RChain file manager

General purpose file manager connected to a [rchain-token#files](https://github.com/fabcotech/rchain-token/tree/files) contract on the RChain blockchain.

```
npm i
npm run start
```

### Development:
Install NodeJS v15.0+. We recommend using NVM (Node Version Manager) to make upgrading/downgrading easier if you need to jump between multiple projects that require different nodejs versions..
If you're on Windows, you can either use:
1) WSL2, in which case steps are the same as for Ubuntu.
2) Natively on Windows with https://github.com/coreybutler/nvm-windows

Note: When developing natively on Windows, package node-sass will require python in order to build itself. Open a CMD prompt with admin privileges, and run the following:
npm install --global windows-build-tools
npm config set python c:\users\<USER>\.windows-build-tools\python27\python.exe