#!/bin/bash
set -x  # Enable script debugging
exec 2>/tmp/feedingchart-start.sh.log  # Redirect errors to a log file
deno task build
deno task start