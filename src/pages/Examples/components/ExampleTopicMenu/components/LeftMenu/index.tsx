import React, { useEffect, useState } from 'react';
import { Anchor, Menu } from 'antd';
import { debounce } from 'lodash-es';
import { useLocale } from 'dumi';
import { createFromIconfontCN } from '@ant-design/icons';
import { LeftMenuProps } from '../../../../types';
import styles from '../../../../index.module.less';

const MenuIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_470089_1lnym745udm.js', // generated by iconfont.cn
});


/**
 * LeftMenu
 *
 * @param {LeftMenuProps} props 相关参数，详见类型定义
 * @returns {React.FC} React.FC
 * @author YuZhanglong <loveyzl1123@gmail.com>
 */
export const LeftMenu: React.FC<LeftMenuProps> = (props) => {
  const { exampleTopics } = props;

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const locale = useLocale();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  return (
    <Anchor className={styles.galleryAnchor}>
      <Menu
        mode='inline'
        selectedKeys={selectedKeys}
        style={{ height: '100%' }}
        openKeys={openKeys}
        onOpenChange={(currentOpenKeys) =>
          setOpenKeys(currentOpenKeys as string[])
        }
        forceSubMenuRender
      >
        {exampleTopics.map((topic) => {
          return <Menu.SubMenu key={topic.id} title={
            <div>
              <MenuIcon className={styles.menuIcon} type={`icon-${topic.icon}`} />
              <span>{topic.title[locale.id]}</span>
            </div>
          }>
            {topic.examples.map((example) => {
              return (
                <Menu.Item key={example.id}>
                  <Anchor.Link
                    href={`#category-${example.id.replace(/\s/g, '')}`}
                    title={
                      <div>
                        <span>{example.title[locale.id]}</span>
                      </div>
                    }
                  />
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>;
        })}
      </Menu>
    </Anchor>
  );
};