# Theya — design system for landing pages

Новый monorepo, отдельный от продуктовой ДС (wpm-by-claude). Фаза 1 (токены)
собрана из вашего Figma-экспорта: primitive- и semantic-слои, светлая и тёмная
темы.

## Структура

```
theya/
├── package.json              ← корневой, pnpm workspace
├── pnpm-workspace.yaml
└── packages/
    └── tokens/
        ├── package.json
        ├── style-dictionary.config.mjs        ← светлая тема + size/typography
        ├── style-dictionary.dark.config.mjs   ← тёмная тема (отдельный проход)
        ├── src/
        │   ├── primitive/
        │   │   ├── color.json        (176 переменных: blue, slate, gray, red...)
        │   │   ├── size.json         (44 значения шкалы, 0–1000)
        │   │   └── typography.json   (шрифты, начертания, курсивы)
        │   └── semantic/
        │       ├── color.default.json
        │       ├── color.dark.json
        │       ├── size.json
        │       └── typography.json   (композитные токены: font/weight/size/line-height/letter-spacing)
        └── build/            ← генерируется командой build, в git не коммитим
            ├── css/variables.css
            ├── css/variables-dark.css
            ├── js/tokens.js
            ├── js/tokens.d.ts
            └── tailwind/tokens.json
```

Все semantic-токены — это ссылки на primitives (`{color.blue.blue-500}`), а не
задублированные значения. Это уже проверено и билдится без ошибок.

## Что уже проверено

- Style Dictionary v4 собирает светлую и тёмную темы отдельными CSS-файлами
  (`:root` и `[data-theme="dark"]`)
- Alias-связи между primitive и semantic резолвятся корректно
- Один нюанс: primitive `size1,2` (1.2) и `size12` (12) при преобразовании
  в JS-имена (`SizeSize12`) схлопываются в одно и то же — коллизия только в
  JS/TS-выводе, в CSS они остаются раздельными переменными. `size1,2` сейчас
  нигде не используется в semantic-слое, так что не блокирует работу — но
  стоит переименовать в Figma при случае, чтобы не всплыло позже.

## Как запустить у себя

1. Скачайте и распакуйте архив, положите папку `theya` куда обычно храните
   проекты (например, рядом с `wpm-by-claude`).
2. В терминале:
   ```bash
   cd путь/до/theya
   pnpm install
   pnpm build:tokens
   ```
3. Проверьте, что появились файлы в `packages/tokens/build/` — если да,
   токены собрались.
4. Инициализируйте git и запушьте в новый репозиторий на GitHub (можно
   через GitHub Desktop или терминал — скажите, что удобнее, распишу шаги).

## Дальше — Фаза 2

Когда токены будут у вас в репозитории и соберутся без ошибок — переходим
к `packages/components` и первым React-компонентам (Button, Card) со
Storybook, ориентируясь на референсы сайтов, которые вы пришлёте.
