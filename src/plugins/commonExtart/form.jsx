/**
 * @description: 渲染查询表单
 * @param {Object} h
 * @return: 查询表单template
 */
export function formRender (h) {
  const more = (
    <div
      class={['more-select', this.moreStatus ? 'down' : 'up']}
      on-click={() => {
        this.moreSelect();
      }}
    >
      <span
        domPropsInnerHTML={
          this.moreStatus
            ? String(this.$t('button.expand'))
            : String(this.$t('button.collapse'))
        }
      ></span>
      <i
        class={
          this.moreStatus
            ? 'el-icon-caret-bottom'
            : 'el-icon-caret-top'
        }
      ></i>
    </div>
  );
  return (
    <div class="form-content">
      <div
        ref="contentForm"
        id="contentForm"
        class={[
          'grid-search-form-box',
          'has-shadow',
          this.moreStatus ? 'grid-more' : 'grid-less'
        ]}
        style={
          this.moreStatus ? 'height:' + this.singleLineFormHeight + 'px' : ''
        }
      >
        <div style="display:flex;" class="grid-search-form">
          <el-form
            ref="searchForm"
            class="search-form"
            inline={true}
            {...{
              props: {
                model: this.model
              }
            }}
          >
            {this.$slots.form ? this.$slots.form : ''}
          </el-form>
          <el-form style="min-width:224px;width:224px">
            <el-form-item>
              <el-button
                size="mini"
                type="primary"
                on-click={() => {
                  this.getDataList(1);
                }}
              >
                {this.$t('button.search')}
              </el-button>
              <el-button
                size="mini"
                on-click={() => {
                  this.resetFormData();
                }}
              >
                {this.$t('button.reset')}
              </el-button>
              {this.$slots.formBtn ? this.$slots.formBtn : ''}
            </el-form-item>
          </el-form>
        </div>
        {!!this.hasMoreBtn ? more : ''}
      </div>

      <div
        class={[
          'grid-search-form-box',
          'has-shadow',
          'grid-hide-form',
          this.moreStatus ? 'grid-more' : 'grid-less'
        ]}
      >
        <div style="display:flex;width：100%" class="grid-search-form">
          <el-form ref="gridHideForm" class="search-form" inline={true}>
            <el-form-item label="hide">
              <el-input size="mini" placeholder="hide" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-form style="min-width:224px;width:224px">
            <el-form-item>
              <el-button
                size="mini"
                type="primary"
                on-click={() => {
                  this.getDataList(1);
                }}
              >
                {this.$t('button.search')}
              </el-button>
              <el-button
                size="mini"
                on-click={() => {
                  this.resetFormData();
                }}
              >
                {this.$t('button.reset')}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  );
}

export default {
  
}