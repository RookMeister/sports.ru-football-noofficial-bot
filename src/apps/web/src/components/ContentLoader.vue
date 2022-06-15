<template>
  <div class="ha-content-loader"><slot /></div>
</template>

<style lang="less">
.ha-content-loader {
  & > div {
    position: relative;
    background: #F2F2F2;
    overflow: hidden;
    &::after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      background: linear-gradient(90deg, #F2F2F2 0%, #E5E5E5 50.58%, #F2F2F2 100%);
      animation: shine-skeleton 1000ms 0ms ease-in forwards infinite;
      width: 100%;
      height: 100%;
    }
  }

  @keyframes shine-skeleton{
    0% { left: -100% }
    to { left: 100% }
  }
}
</style>
