<template>
  <div class="tags-view-wrapper">
    <router-link
      v-for="tag in visitedViews"
      :key="tag.path"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      custom
      v-slot="{ navigate }"
    >
      <span
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        @click="navigate"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
      >
        {{ tag.meta.title }}
        <span v-if="!isAffix(tag)" class="icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </span>
    </router-link>
  </div>
</template>

<script>
import tagsViewEffect from './effect'

export default {
  name: 'TagsView',
  setup() {
    const { visitedViews, isActive, isAffix, closeSelectedTag } = tagsViewEffect()

    return {
      visitedViews,
      isActive,
      isAffix,
      closeSelectedTag
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/_variable';
.tags-view-wrapper {
  position: relative;
  width: 100%;
  min-height: 34px;
  border-bottom: 1px solid $color-border-normal;
  overflow-y: hidden;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    position: relative;
    display: inline-block;
    height: 34px;
    padding: 0 8px;
    margin-left: -1px;
    border: 1px solid $color-border-normal;
    border-top: none;
    border-bottom: none;
    font-size: 12px;
    line-height: 34px;
    color: #495060;
    background: #fff;
    cursor: pointer;
    &:first-of-type {
      margin-left: -1px;
    }
    &:last-of-type {
      margin-right: -1px;
    }
    &.active {
      border-color: $color-primary-1;
      border-bottom: solid 2px $color-primary;
      color: $color-primary;
      background-color: $color-primary-1;
      &::before {
        position: relative;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.4rem;
        border-radius: 50%;
        background: $color-primary-3;
        content: '';
      }
      .icon-close {
        color: $color-white-10;
        background-color: $color-primary-1;
      }
    }
    .icon-close {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      // vertical-align: 2px;
      border-radius: 50%;
      line-height: 1.2rem;
      text-align: center;
      color: #999;
      background-color: #eee;
      transform-origin: 100% 50%;
      &::before {
        // transform: scale(.6);
        display: inline-block;
        content: '×';
        // vertical-align: -3px;
      }
      &:hover {
        color: #fff;
        background-color: $color-primary-3;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
}
</style>
