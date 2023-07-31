export default `
<?xml version="1.0" encoding="UTF-8"?>
<cwbopendata xmlns="urn:cwb:gov:tw:cwbcommon:0.1">
    <identifier>CWB-Weather_hazards_20210318185720</identifier>
    <sender>weather@cwb.gov.tw</sender>
    <sent>2021-03-18T18:57:20+08:00</sent>
    <status>Actual</status>
    <scope>Public</scope>
    <msgType>Update</msgType>
    
    <dataset>
        <datasetInfo>
            <datasetDescription>大雨特報</datasetDescription>
            <datasetLanguage>zh-TW</datasetLanguage>
            <issueTime>2021-03-18T18:35:00+08:00</issueTime>
            <validTime>
                <startTime>2021-03-18T18:39:00+08:00</startTime>
                <endTime>2021-03-19T05:00:00+08:00</endTime>
            </validTime>
            <update>2021-03-18T18:57:20+08:00</update>
        </datasetInfo>

        <contents>
            <content>
                <contentLanguage>zh-TW</contentLanguage>
                <contentText>
                對流雲系發展旺盛，易有短時強降雨，今（１８日）晚至明（１９）日花蓮地區及宜蘭山區有局部大雨發生的機率，請注意。
                </contentText>
            </content>
        </contents>

        <hazardConditions>
            <hazards>
                <hazard>
                    <info>
                        <language>zh-TW</language>
                        <phenomena>大雨</phenomena>
                        <significance>特報</significance>
                        <affectedAreas>
                            
    <location>
        <locationName>宜蘭縣山區</locationName>
        
    </location>
    <location>
        <locationName>花蓮縣</locationName>
        
    </location></affectedAreas>
                    </info>
                </hazard>
            </hazards>
        </hazardConditions>

    </dataset>
    <dataset>
        <datasetInfo>
            <datasetDescription>濃霧特報</datasetDescription>
            <datasetLanguage>zh-TW</datasetLanguage>
            <issueTime>2021-03-18T18:50:00+08:00</issueTime>
            <validTime>
                <startTime>2021-03-18T18:50:00+08:00</startTime>
                <endTime>2021-03-18T23:00:00+08:00</endTime>
            </validTime>
            <update>2021-03-18T18:57:20+08:00</update>
        </datasetInfo>

        <contents>
            <content>
                <contentLanguage>zh-TW</contentLanguage>
                <contentText>
                今（１８日）晚至明（１９）日西半部地區、基隆北海岸及澎湖、金門、馬祖有局部霧或低雲影響能見度，馬祖、桃園已出現能見度不足２００公尺的現象，苗栗能見度亦較低，請注意。
                </contentText>
            </content>
        </contents>

        <hazardConditions>
            <hazards>
                <hazard>
                    <info>
                        <language>zh-TW</language>
                        <phenomena>濃霧</phenomena>
                        <significance>特報</significance>
                        <affectedAreas>
                            
    <location>
        <locationName>桃園市</locationName>
        
    </location>
    <location>
        <locationName>連江縣</locationName>
        
    </location></affectedAreas>
                    </info>
                </hazard>
            </hazards>
        </hazardConditions>

    </dataset>
</cwbopendata>
`
