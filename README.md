<div align="center">
    <h1>🤖 Wolke Bot</h1>
    The Discord bot that acts as a frontend for Wolke
    <br>
    <br>
</div>

# Deploying

To deploy Wolke Bot you'll need podman with rootless setup

To build Wolke Bot main image use:

```
# Build Wolke Bot with tag latest
$ podman build -t wolke_bot:latest .
```

To run Wolke Bot use:

```
# Run Wolke Bot in detached mode
$ podman run --name wolke_bot --pod wolke -d wolke_bot:latest
```

# License

MIT
