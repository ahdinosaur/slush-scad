# <%= name %>

<%= description %>

## how

### install

requires `openscad` to be installed, then

```
git clone https://github.com/<%= author %>/<%= name %>
cd <%= name %>
npm install
```

## develop

```
npm start
```

browse to <http://localhost:8000/> to see the current model.

edit scad/*.scad to edit the model.

## deploy

```
npm run deploy
```

## license

<%= license %>
