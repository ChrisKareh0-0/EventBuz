module.exports = {
    apps: [
        {
            name: "my-nextjs-app", // You can name it whatever you want
            script: "npm", // If you're using yarn, you can put 'yarn' here
            args: "start", // Your script here (start, custom script, etc.)
            env: {
                NODE_ENV: "production",
            },
            instances: "max", // Optional: Scales your app across all CPUs
            exec_mode: "cluster",
        },
    ],
};