# Local DJ 

Command line music player that broadcasts to everyone on the same network

```
npm install
```

On the DJ's machine

```
node index.js music.mp3 # plays and broadcasts music.mp3
```

On other computers on the same network

```
node index.js # plays music.mp3 at the same time offset as DJ'machine
```


## Requirements

currently requires mpg123.

* OSX: `brew install mpg123`
