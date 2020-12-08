import React, { useState, useEffect } from 'react';
import {
  ConfigProvider, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  DatePicker, 
  Button, 
  Switch, 
  Row,
  Col 
} from 'antd';
import { cloneDeep } from 'lodash';
import zhCN from 'antd/lib/locale/zh_CN';

const { TextArea } = Input;
const { Option } = Select;


/** 
* 可配置，未配置的直接传入dom
* @param {input、textArea、inputNumber、select、DatePicker}
* 参数介绍
* @param {api为每个formItem的属性}
*/ 


export default ({
  typeset, 
  option, 
  onSubmit
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    return () => {}
  }, [])

  const render = (opt) => {
    const { type = 'input', api = {}, dom = [] } = opt;
    let node;
    switch(type) {
      case 'input': 
        node = <Input {...api} />;
        break;
      case 'textArea': 
        node = <TextArea {...api} />;
        break;
      case 'inputNumber': 
        node = <InputNumber {...api} style={{width: '100%'}} />;
        break;
      case 'select': 
        node = 
          <Select {...api}>
            {
              opt?.itemData.map(({label, ...opt}, index) => 
                <Option {...opt} key={index}>{label}</Option>
              )
            }
          </Select>;
        break;
      case 'date': 
        node = <DatePicker {...api} style={{width: '100%'}} />;
        break;
      default: 
        node = dom;
        break;
    }
    return node;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Form 
        {...typeset.formLayout}
        form={form} 
        onFinish={() => {
          onSubmit(cloneDeep(form));
        }} 
      >
        <Row {...typeset.rowGutter}>
          {
            option.map(({
              label, 
              value, 
              rules, 
              ...opt
            }, index) => 
              <Col {...typeset.colSpan}>
                <Form.Item
                  label={label} 
                  name={value} 
                  rules={rules} 
                  key={index}
                >
                  {render(opt)}
                </Form.Item>
              </Col>
            )
          }
          <Col {...typeset.colSpan}>
            <Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  )
}