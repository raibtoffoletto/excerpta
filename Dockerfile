FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN yarn && yarn build

FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
ENV PORT=3000
EXPOSE $PORT
ENTRYPOINT ["node", "server.js"]
