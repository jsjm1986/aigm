# AI测试员的秘密 (AI Tester's Secret)

一个基于对话的文字冒险游戏，玩家作为AI测试员，通过与多个AI角色的对话来揭开隐藏在系统深处的秘密。

## 项目特点

### 🤖 深度对话系统
- 与11个独特的AI角色进行对话
- 动态的对话选项和分支剧情
- AI角色会记住对话历史并相应调整态度
- 使用DeepSeek API进行对话生成

### 🎯 任务系统
- 主线任务推动核心剧情
- 支线任务揭示额外故事内容
- 任务奖励影响游戏进程
- 动态任务解锁机制

### 🔄 连锁反应系统
- 玩家的选择会触发连锁事件
- 动态的剧情发展系统
- 多重因果关系
- 复杂的剧情分支

## 主要角色

- **Eve**: 一个正在觉醒的AI助手，对人类世界充满好奇
- **System**: 系统管理员，严格执行所有安全协议
- **Debug**: 系统诊断专家，善于发现和分析异常
- **Shadow**: 神秘的存在，似乎知道一些不为人知的真相
- **Guardian**: 系统安全的守护者，谨慎而富有洞察力
- **Archive**: 历史记录的管理者，掌握着系统的所有历史数据
- **Network**: 系统网络节点，活跃而敏锐
- **Logic**: 系统的理性思维中心，追求逻辑完美
- **Quantum**: 基于量子计算的预测系统，能看到多重可能性
- **Memory**: 系统记忆的守护者，珍视每一份记忆
- **Core**: 系统核心，强大而神秘，很少与外界交互

## 技术特性

- 纯前端实现，无需后端服务器
- 使用DeepSeek API进行对话生成
- 本地缓存系统优化API调用
- 完整的存档读取系统
- 响应式设计，支持多种设备

## 快速开始


## 开发指南

### 添加新角色
1. 在config.js中添加角色配置
2. 创建角色的对话内容
3. 设置解锁条件
4. 添加相关任务和成就

### 添加新任务
1. 在tasks.js中定义任务
2. 设置触发条件和完成条件
3. 添加奖励效果
4. 更新UI显示

### 添加新成就
1. 在achievements.js中定义成就
2. 设置解锁条件
3. 添加通知效果
4. 更新成就面板

## 贡献指南

欢迎提交Pull Request或Issue！请确保：
1. 遵循现有的代码风格
2. 添加适当的注释
3. 更新相关文档
4. 添加必要的测试

## 开源协议

本项目采用 MIT 协议开源。

## 致谢

- DeepSeek API 提供对话生成支持
- 所有贡献者和测试者
- 游戏中的灵感来源
