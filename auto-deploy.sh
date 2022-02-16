
#!/bin/bash
# Переходим в категорию GIT
cd '/home/rook/sports.ru-football-noofficial-bot'

# Загружаем данные из ветки dev
git checkout main
git pull
pnpm build
pm2 reload app