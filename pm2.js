const pm2 = require('pm2')

function connect() {
  return new Promise((resolve, reject) => {
    pm2.connect(function(err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function start(file, name) {
  return new Promise((resolve, reject) => {
    pm2.start({
      script    : file,
      name      : name
    }, function(err, apps) {
      if(err) {
        return reject(err)
      }
      return resolve(apps)
    })
  })
}

function stop(nameOId) {
  return new Promise((resolve, reject) => {
    pm2.stop(nameOId, (err, proc) => { 
      if(err) {
        return reject(err)
      }
      return resolve(proc)
    })
  })
}

function restart(nameOId) {
  return new Promise((resolve, reject) => {
    pm2.restart(nameOId, (err, proc) => { 
      if(err) {
        return reject(err)
      }
      return resolve(proc)
    })
  })
}

function list() {
  return new Promise((resolve, reject) => {
    pm2.list((err, list) => { 
      if(err) {
        return reject(err)
      }
      return resolve(list)
    })
  })
}

function disconnect() {
  return new Promise((resolve, reject) => {
    pm2.disconnect(function(err) {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function deleteCont(nameOId) {
  return new Promise((resolve, reject) => {
    pm2.delete(nameOId, (err, proc) => { 
      if(err) {
        return reject(err)
      }
      return resolve(proc)
    })
  })
}

module.exports = { connect, start, stop, restart, list, disconnect, deleteCont }