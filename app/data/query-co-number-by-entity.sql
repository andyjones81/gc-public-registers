SELECT  [AccountRowId]
      ,[AccountName]
      ,[AccountNo]
      ,[AccountType]
      ,[AccountStatus]
      ,[ParentAccount]
      ,[Entity]
      ,[RegistrationNo]
      ,[RegistrationIncorporationDate]
      ,[CountryOfRegistrationIncorporation]
      ,[HighImpactOperator]
      ,[SSO]
      ,[RegisteredIncorporatedWith]
  FROM [Siebel].[dbo].[AccountHeader]
  where accounttype = 'Operator' and AccountStatus = 'Active'
  and entity in ('Community Interest Company'
      ,'Corporate Body'
      ,'Limited Liability Partnership'
      ,'Non-Commercial Society'
      ,'Private Limited Company'
      ,'Private Unlimited Company'
      ,'Public Limited Company')
  and RegistrationNo is not null


select distinct(RegisteredIncorporatedWith), count(*)
  FROM [Siebel].[dbo].[AccountHeader]
  where accounttype = 'Operator' and AccountStatus = 'Active'
  and entity in ('Community Interest Company'
      ,'Corporate Body'
      ,'Limited Liability Partnership'
      ,'Non-Commercial Society'
      ,'Private Limited Company'
      ,'Private Unlimited Company'
      ,'Public Limited Company')
      group by RegisteredIncorporatedWith
      
      
      select distinct(CountryOfRegistrationIncorporation), count(*)
  FROM [Siebel].[dbo].[AccountHeader]
  where accounttype = 'Operator' and AccountStatus = 'Active'
  and entity in ('Community Interest Company'
      ,'Corporate Body'
      ,'Limited Liability Partnership'
      ,'Non-Commercial Society'
      ,'Private Limited Company'
      ,'Private Unlimited Company'
      ,'Public Limited Company')
      group by CountryOfRegistrationIncorporation

     
      select distinct(RegistrationNo), count(*)
  FROM [Siebel].[dbo].[AccountHeader]
  where accounttype = 'Operator' and AccountStatus = 'Active'
  and entity in ('Community Interest Company'
      ,'Corporate Body'
      ,'Limited Liability Partnership'
      ,'Non-Commercial Society'
      ,'Private Limited Company'
      ,'Private Unlimited Company'
      ,'Public Limited Company')
      group by RegistrationNo
      