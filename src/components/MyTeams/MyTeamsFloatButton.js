import React, { useState } from 'react'
import { Button } from 'antd';
import { PlusCircleFilled, UserOutlined, GoldFilled, FileTextOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styles from './MyTeamsFloatButton.module.css'

const MyTeamsFloatButton = React.memo(() => {
    
    const [isopen, setisopen] = useState(false)

    const floatButtonHandler = () => {
        setisopen(!isopen)
    }
    const open ={
        opacity:"0.8",
        transform: "scale(1)",
        transition: "all 0.1s ease-in-out"
    }
    const close ={
        opacity:"0",
        transform: "scale(0)",
        transition: "all 0.1s ease-in-out"
    }
    return (
        <div>
                <>
                    <PlusCircleFilled className={styles.icon} onClick={floatButtonHandler} />
                    <p className={ `${styles.paragraph}  ${styles.eventpg} ${styles.pgpfr}`} style={isopen?open:close}>Bulk Lead</p>
                    <Button type="primary" shape="circle" size="large" icon={<GoldFilled />} className={`${styles.eventicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    <p className={`${styles.paragraph}  ${styles.goalpg} ${styles.pgpfr}`} style={isopen?open:close}>Add Proposal</p>
                    <Button type="primary" shape="circle" size="large" icon={<FileTextOutlined/>} className={`${styles.goalicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    <p className={`${styles.paragraph}  ${styles.leadpg} ${styles.pgpfr}`} style={isopen?open:close}>Add Lead</p>
                    <Link to="/leadmasterpage/statuslead">
                        <Button type="primary" shape="circle" size="large" icon={<UserOutlined />} className={`${styles.leadicon} ${styles.iconpfr}`} style={isopen?open:close}/>
                    </Link><div className={isopen?styles.open:styles.close}>
                        <div className={styles.content}>
                        </div>
                        <div className={styles.content}>
                        </div>
                        <div className={styles.content}>
                        </div>
                    </div>
                </>
        </div>
    )
})

export default MyTeamsFloatButton