#!/usr/bin/env bash

# Load the retry-call utility function.
source ./scripts/ci/retry-call.sh

# Variable the specifies how often the wait script should be invoked if it fails.
WAIT_RETRIES=2

start_tunnel() {
  case "$MODE" in
    sauce*)
      ./scripts/ci/sauce/start-tunnel.sh
      ;;
    browserstack*)
      ./scripts/ci/browserstack/start-tunnel.sh
      ;;
    *)
      ;;
  esac
}

wait_for_tunnel() {
  case "$MODE" in
    sauce*)
      retryCall ${WAIT_RETRIES} ./scripts/ci/sauce/wait-tunnel.sh
      ;;
    browserstack*)
      retryCall ${WAIT_RETRIES} ./scripts/ci/browserstack/wait-tunnel.sh
      ;;
    *)
      ;;
  esac
}

teardown_tunnel() {
  case "$MODE" in
    sauce*)
      ./scripts/ci/sauce/stop-tunnel.sh
      ;;
    browserstack*)
      ./scripts/ci/browserstack/stop-tunnel.sh
      ;;
    *)
      ;;
  esac
}

