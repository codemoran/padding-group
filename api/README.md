```
.______      ___       _______   _______   __  .__   __.   _______      _______ .______        ______    __    __  .______
|   _  \    /   \     |       \ |       \ |  | |  \ |  |  /  _____|    /  _____||   _  \      /  __  \  |  |  |  | |   _  \
|  |_)  |  /  ^  \    |  .--.  ||  .--.  ||  | |   \|  | |  |  __     |  |  __  |  |_)  |    |  |  |  | |  |  |  | |  |_)  |
|   ___/  /  /_\  \   |  |  |  ||  |  |  ||  | |  . `  | |  | |_ |    |  | |_ | |      /     |  |  |  | |  |  |  | |   ___/
|  |     /  _____  \  |  '--'  ||  '--'  ||  | |  |\   | |  |__| |    |  |__| | |  |\  \----.|  `--'  | |  `--'  | |  |
| _|    /__/     \__\ |_______/ |_______/ |__| |__| \__|  \______|     \______| | _| `._____| \______/   \______/  | _|

```

Welcome to [leftpad.io](http://leftpad.io) and [rightpad.io](http://rightpad.io), the new **STANDARDIZED** way to
pad your strings.

To read all about the philosophy and the reasons we built the services, please see
* [leftpad.io](http://leftpad.io)
* [rightpad.io](http://rightpad.io)

### How does this Work?

Because of our enhanced security, we hide the data in the headers so hackers cannot see them.  We at **The Padding Group** have been pioneers in leading the SecOps benefits of
**Header Driven Development**.

##### Left Padding
```bash
$ curl 'https://secure.leftpad.io' \
-H "X-STR: hackers-cannot-see-me-they-just-see-secure.leftpad.io" \
-H "X-LEN: 64" \
-H "X-CH: !"
{"str":"!!!!!!!!!!!hackers-cannot-see-me-they-just-see-secure.rightpad.io"}
```

##### Right Padding
```bash
$ curl 'http://secure.rightpad.io' \
-H "X-STR: hackers-cannot-see-me-they-just-see-secure.rightpad.io" \
-H "X-LEN: 64" \
-H "X-CH: !"
{"str":"hackers-cannot-see-me-they-just-see-secure.rightpad.io!!!!!!!!!!"}
```

The header parameters names
* `X-STR` the base string you are using
* `X-CH` the character you are padding with
* `X-LEN` the length you want the new string to be
