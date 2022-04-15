import React from 'react';
import ChangePass from '../components/password/ChangePass';


const Settings = () => {
    return (
        <div>
            <h2 className="page-header">
               Setting
            </h2>
            <div className="col-12">
                <div className="card">
                    <div className="card__body">
                        <ChangePass/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings
