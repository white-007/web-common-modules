export const FILTER_OPTIONS = [
  {
    type: 'input',
    label: '账号',
    code: 'account',
    defaultValue: '',
    elCompAttrs: {
      placeholder: '请输入账号',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '手机号',
    code: 'mobile',
    defaultValue: '',
    elCompAttrs: {
      placeholder: '请输入手机号',
      clearable: true
    }
  },
  {
    type: 'input',
    label: '真实姓名',
    code: 'realName',
    defaultValue: '',
    elCompAttrs: {
      placeholder: '请输入真实姓名',
      clearable: true
    }
  },
  {
    type: 'select',
    label: '员工状态',
    code: 'staffState',
    defaultValue: null,
    elCompAttrs: {
      placeholder: '请选择员工状态',
      clearable: true,
      options: [
        {
          label: '启用',
          value: 'ENABLED'
        },
        {
          label: '禁用',
          value: 'DISABLED'
        }
      ],
      'allow-clear': true
    }
  }
]
