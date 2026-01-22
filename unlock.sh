#!/bin/bash
# Achievement Unlocked - Quick trigger script
# Usage: ./unlock.sh "Title" score "Description"
# Example: ./unlock.sh "Ship It!" 50 "Deployed to production"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=5052

# Default values
TITLE="${1:-Achievement Unlocked}"
SCORE="${2:-50}"
DESC="${3:-}"

# URL encode function
urlencode() {
    python3 -c "import urllib.parse; print(urllib.parse.quote('$1', safe=''))"
}

# Check if server is running
if ! lsof -i :$PORT > /dev/null 2>&1; then
    echo "Starting server on port $PORT..."
    cd "$SCRIPT_DIR"
    python3 -m http.server $PORT > /dev/null 2>&1 &
    SERVER_PID=$!
    sleep 1
    STARTED_SERVER=true
else
    STARTED_SERVER=false
fi

# Build URL
ENCODED_TITLE=$(urlencode "$TITLE")
ENCODED_DESC=$(urlencode "$DESC")
URL="http://localhost:$PORT/achievement.html?title=$ENCODED_TITLE&score=$SCORE&desc=$ENCODED_DESC"

# Open in browser
echo "🏆 Achievement: $TITLE ($SCORE G)"
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "$URL"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$URL" 2>/dev/null || sensible-browser "$URL"
else
    start "$URL"
fi

# If we started the server, wait a bit then kill it
if [ "$STARTED_SERVER" = true ]; then
    sleep 6
    kill $SERVER_PID 2>/dev/null
fi
