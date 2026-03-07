#!/bin/sh
# Customize Ping.pub explorer for Setara

LAYOUT="/app/src/layouts/components/DefaultLayout.vue"
FOOTER="/app/src/layouts/components/NavFooter.vue"

# 1. Replace sidebar header: remove text, keep only logo
sed -i 's|<img class="w-10 h-10" src="../../assets/logo.svg" />|<img class="w-10 h-10 rounded-lg" src="../../assets/logo.png" />|' "$LAYOUT"
sed -i 's|<h1 class="flex-1 ml-3 text-2xl font-semibold dark:text-white">Ping.pub</h1>||' "$LAYOUT"

# 2. Remove Tools, Sponsors, Links section
python3 -c "
with open('$LAYOUT', 'r') as f:
    content = f.read()

start_marker = '    <div class=\"px-2\">'
idx = content.find(start_marker)
if idx >= 0:
    idx2 = content.find(start_marker, idx + 1)
    if idx2 >= 0:
        end = content.find('</div>\n    </div>', idx2)
        if end >= 0:
            content = content[:idx2] + content[end + len('</div>\n    </div>'):]

with open('$LAYOUT', 'w') as f:
    f.write(content)
"

# 3. Replace footer
cat > "$FOOTER" << 'FOOTEREOF'
<template>
  <footer class="flex items-center h-12 mt-5 text-sm bg-gray-100 dark:bg-[#171d30] py-2 z-10 w-full">
    <div class="flex flex-1">
      &copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;Setara Network. Powered by&nbsp;
      <a class="link link-primary no-underline" href="https://ping.pub" target="_blank" rel="noopener noreferrer">Ping.pub</a>
    </div>
    <div class="hidden md:!block">
      <a class="link link-primary no-underline mr-4" href="https://setara.network" target="noopener noreferrer">Website</a>
      <a class="link link-primary no-underline" href="https://github.com/setara-network" target="noopener noreferrer">Github</a>
    </div>
  </footer>
</template>
FOOTEREOF

# 4. Copy icon as chain logo so it shows next to block number in navbar
cp /app/setara-icon.png /app/public/logos/setara.png 2>/dev/null || mkdir -p /app/public/logos && cp /app/setara-icon.png /app/public/logos/setara.png

echo "Customization complete"
