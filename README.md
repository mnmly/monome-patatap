# Monome ✖ patatap

Monome owner? and love [patatap](http://patatap.com) by [@jonobr1](http://jonobr1.com) and [lullatone](http://lullatone.com)?

### Installation

```
  $ git clone git@github.com:mnmly/patatap-monome.git
  $ cd patatap-monome
  $ npm install
```

### usage?

1. Make sure you've installed [serialosc](http://monome.org/docs/setup:mac) and restarted your machine after installation
2. Run `node index`
3. Plugin your monome
4. Go to http://patatap.com
5. Paste the code `client.js` to your `Developer Tools's console`
6. Start jamming


### Note
- I only have monome64, so I can't test for other devices, but it should hopefully works.
- It only maps the key index of `0,0` to `3,2` and `7,7` for changing the theme (space key equivalent)
