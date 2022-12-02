/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig


// curl -s -H "Content-Type: application/json" -X POST "http://findata-connect-dev.worldbank.org:9047/apiv2/login" -d '{"userName":"jhayathbasha@worldbankgroup.org","password":"wyCNVnwmRzKV5w1fv/D5vLQVqatkDisnEK8MdxJcfC70PAe12XwpKoPNrOfeNg=="}' |jq |grep token|cut -d, -f1  "token": "2aao64qd7ae4ri43ue111626g1"
